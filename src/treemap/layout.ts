import type { LeafLayout, NodeLayout, Rect, TreeNode, TreemapLayout } from './types';
import { isLeaf, validateCanvasSize, validateTree } from './validate';

/**
 * 整数像素 squarify 树图布局。
 *
 * 每层流程：
 * 1. 子节点按「子树权重降序、id 升序」排序后进入 squarify（id 全局唯一 ⇒ 全序，结果确定）；
 * 2. 沿父矩形短边组行：只有加入下一项不会增大该行最差长宽比时才继续，否则另起一行；
 * 3. 行厚（沿长边堆叠方向的厚度）与行内跨度（沿短边方向的跨度）分别用
 *    最大余数法分配整数像素，余数相同按 id 裁决（行以其行首项 id 裁决）。
 *
 * 由于每层的行厚之和 == 父矩形长边、行内跨度之和 == 父矩形短边，
 * 兄弟矩形构成父矩形的精确划分：互不重叠、面积之和恰好等于父矩形面积。
 * 分配得到零面积的项不渲染，但会列入 hidden。
 */

/** 排序比较器：子树权重降序；权重相同按 id 升序（charCode 字典序）。 */
export function compareByWeightThenId(
  a: { weight: number; id: string },
  b: { weight: number; id: string },
): number {
  if (a.weight !== b.weight) return b.weight - a.weight;
  return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
}

/**
 * 最大余数法：把 total（非负整数）按 weights 比例分配为整数，各项之和恰为 total。
 * 先取 floor(weight·total/Σweight)，剩余名额按「余数降序、id 升序」依次 +1。
 * 权重与 total 均为整数且 weight·total < 2^53，余数用整数精确表示（分子，分母同为 Σweight）。
 */
export function largestRemainder(weights: number[], total: number, ids: string[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0)
  if (sum <= 0) return weights.map(() => 0)
  return weights.map((w) => Math.floor((w * total) / sum))
}

function compareId(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * 一行的最差长宽比（Bruls 等人的 squarify 公式）。
 * 行内各项沿长度 side 的边堆叠，行厚 = Σw/side，项跨度 = wᵢ/行厚，
 * 长宽比对整体像素缩放不变，故直接以权重代替面积：
 *   worst = max( side²·w_max / Σ² , Σ² / (side²·w_min) )，值 ≥ 1，越小越方。
 */
export function worstRatio(weights: number[], side: number): number {
  if (weights.length === 0 || side <= 0) return Infinity;
  let sum = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const w of weights) {
    sum += w;
    if (w < min) min = w;
    if (w > max) max = w;
  }
  const s2 = side * side;
  return Math.max((s2 * max) / (sum * sum), (sum * sum) / (s2 * min));
}

/**
 * 组行：顺序扫描，只有加入下一项不会增大当前行最差长宽比时才继续，
 * 否则结束当前行并以该项另起一行。返回每行的下标列表。
 */
export function formRows(weights: number[], side: number): number[][] {
  return weights.map((_, i) => [i])
}

function computeWeights(node: TreeNode, out: Map<string, number>): number {
  const w = isLeaf(node)
    ? node.weight!
    : node.children!.reduce((s, c) => s + computeWeights(c, out), 0);
  out.set(node.id, w);
  return w;
}

/**
 * 对整棵树布局。root 须先通过 validateTree（此处内部会再校验一次），
 * 画布为 300～900 的整数像素。返回的兄弟矩形精确划分父矩形。
 */
export function layoutTreemap(rootInput: TreeNode, width: number, height: number): TreemapLayout {
  const root = validateTree(rootInput);
  const size = validateCanvasSize(width, height);
  const weights = new Map<string, number>();
  computeWeights(root, weights);

  const leaves: LeafLayout[] = [];
  const rootLayout = layoutNode(
    root,
    { x: 0, y: 0, w: size.width, h: size.height },
    [],
    1,
    weights,
    leaves,
  );
  return {
    width: size.width,
    height: size.height,
    root: rootLayout,
    leaves,
    hidden: leaves.filter((l) => l.hidden).map((l) => l.id),
  };
}

function layoutNode(
  node: TreeNode,
  rect: Rect,
  path: string[],
  depth: number,
  weights: Map<string, number>,
  leaves: LeafLayout[],
): NodeLayout {
  const weight = weights.get(node.id)!
  const selfPath = [...path, node.id]
  if (isLeaf(node)) {
    const hidden = rect.w === 0 || rect.h === 0
    leaves.push({ id: node.id, path: selfPath, weight: node.weight!, rect, hidden, depth })
    return { id: node.id, rect, weight, depth, children: [] }
  }
  const children: NodeLayout[] = []
  let x = rect.x
  for (const child of node.children!) {
    const childWeight = weights.get(child.id)!
    const w = Math.floor(rect.w * childWeight / weight)
    children.push(layoutNode(child, { x, y: rect.y, w, h: rect.h }, selfPath, depth + 1, weights, leaves))
    x += w
  }
  return { id: node.id, rect, weight, depth, children }
}
