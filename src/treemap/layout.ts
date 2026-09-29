import type { LeafLayout, NodeLayout, Rect, TreeNode, TreemapLayout } from './types';
import { isLeaf, validateCanvasSize, validateTree } from './validate';

/**
 * 整数像素 squarify 树图布局。
 *
 * 每层流程：
 * 1. 子节点按「子树权重降序、id 升序」排序后进入 squarify（id 全局唯一 ⇒ 全序，结果确定）；
 * 2. 沿父矩形短边组行：只有加入下一项不会增大该行最差长宽比时才继续，否则另起一行；
 * 3. 行厚（沿短边堆叠方向的厚度）与行内跨度（沿长边方向的跨度）分别用
 *    最大余数法分配整数像素，余数相同按 id 裁决（行以其行首项 id 裁决）。
 *
 * 由于每层的行厚之和 == 父矩形短边、行内跨度之和 == 父矩形长边，
 * 兄弟矩形构成父矩形的精确划分：互不重叠、面积之和恰好等于父矩形面积。
 * 分配得到零面积的项不渲染，但会列入 hidden。
 */

/** 排序比较器：子树权重降序；权重相同按 id 升序（charCode 字典序）。 */
export function compareByWeightThenId(
  a: { weight: number; id: string },
  b: { weight: number; id: string },
): number {
  if (a.weight !== b.weight) return b.weight - a.weight;
  return compareId(a.id, b.id);
}

function compareId(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * 最大余数法：把 total（非负整数）按 weights 比例分配为整数，各项之和恰为 total。
 * 先取 floor(weight·total/Σweight)，剩余名额按「余数降序、id 升序」依次 +1。
 * 权重与 total 均为整数且 weight·total < 2^53，余数用整数精确表示（分子，分母同为 Σweight）。
 */
export function largestRemainder(weights: number[], total: number, ids: string[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum <= 0) return weights.map(() => 0);

  const result = weights.map((w) => Math.floor((w * total) / sum));
  let remaining = total - result.reduce((a, b) => a + b, 0);
  if (remaining === 0) return result;

  const order = weights
    .map((w, i) => ({
      i,
      remainder: w * total - result[i] * sum,
      id: ids[i] ?? '',
    }))
    .sort((a, b) => {
      if (a.remainder !== b.remainder) return b.remainder - a.remainder;
      return compareId(a.id, b.id);
    });

  for (const item of order) {
    if (remaining === 0) break;
    result[item.i] += 1;
    remaining -= 1;
  }
  return result;
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
  if (weights.length === 0) return [];

  const rows: number[][] = [];
  let row = [0];
  let currentWorst = worstRatio([weights[0]], side);

  for (let i = 1; i < weights.length; i++) {
    const candidate = [...row, i];
    const candidateWorst = worstRatio(candidate.map((j) => weights[j]), side);
    if (candidateWorst <= currentWorst) {
      row = candidate;
      currentWorst = candidateWorst;
    } else {
      rows.push(row);
      row = [i];
      currentWorst = worstRatio([weights[i]], side);
    }
  }

  rows.push(row);
  return rows;
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

interface LayoutChild {
  id: string;
  node: TreeNode;
  weight: number;
}

function layoutNode(
  node: TreeNode,
  rect: Rect,
  path: string[],
  depth: number,
  weights: Map<string, number>,
  leaves: LeafLayout[],
): NodeLayout {
  const weight = weights.get(node.id)!;
  const selfPath = [...path, node.id];
  if (isLeaf(node)) {
    const hidden = rect.w === 0 || rect.h === 0;
    leaves.push({ id: node.id, path: selfPath, weight: node.weight!, rect, hidden, depth });
    return { id: node.id, rect, weight, depth, children: [] };
  }

  const children: NodeLayout[] = [];
  const entries: LayoutChild[] = node.children!
    .map((child) => ({ id: child.id, node: child, weight: weights.get(child.id)! }))
    .sort(compareByWeightThenId);

  if (rect.w === 0 || rect.h === 0) {
    layoutZeroAreaChildren(entries, rect, selfPath, depth, weights, leaves, children);
  } else {
    layoutPositiveAreaChildren(entries, rect, selfPath, depth, weights, leaves, children);
  }

  return { id: node.id, rect, weight, depth, children };
}

function layoutPositiveAreaChildren(
  entries: LayoutChild[],
  rect: Rect,
  path: string[],
  depth: number,
  weights: Map<string, number>,
  leaves: LeafLayout[],
  out: NodeLayout[],
): void {
  const wide = rect.w >= rect.h;
  const longSide = wide ? rect.w : rect.h;
  const shortSide = wide ? rect.h : rect.w;
  const childWeights = entries.map((c) => c.weight);
  // 权重总面积归一化为 1 后，长边/短边的长度比只取决于父矩形长宽比。
  const rowSide = Math.sqrt(longSide / shortSide);
  const rows = formRows(childWeights, rowSide);
  const rowWeights = rows.map((row) => row.reduce((s, i) => s + childWeights[i], 0));
  const rowIds = rows.map((row) => entries[row[0]].id);
  const rowThickness = largestRemainder(rowWeights, shortSide, rowIds);

  let shortOffset = 0;
  rows.forEach((row, rowIndex) => {
    const thickness = rowThickness[rowIndex];
    const itemWeights = row.map((i) => childWeights[i]);
    const itemIds = row.map((i) => entries[i].id);
    const spans = largestRemainder(itemWeights, longSide, itemIds);

    let longOffset = 0;
    row.forEach((childIndex, itemIndex) => {
      const span = spans[itemIndex];
      const childRect = wide
        ? {
            x: rect.x + longOffset,
            y: rect.y + shortOffset,
            w: span,
            h: thickness,
          }
        : {
            x: rect.x + shortOffset,
            y: rect.y + longOffset,
            w: thickness,
            h: span,
          };
      out.push(
        layoutNode(
          entries[childIndex].node,
          childRect,
          path,
          depth + 1,
          weights,
          leaves,
        ),
      );
      longOffset += span;
    });
    shortOffset += thickness;
  });
}

function layoutZeroAreaChildren(
  entries: LayoutChild[],
  rect: Rect,
  path: string[],
  depth: number,
  weights: Map<string, number>,
  leaves: LeafLayout[],
  out: NodeLayout[],
): void {
  const childWeights = entries.map((c) => c.weight);
  const childIds = entries.map((c) => c.id);

  if (rect.h > 0) {
    // 宽为 0：沿仍有像素的高度精确划分，所有后代均为零面积。
    const heights = largestRemainder(childWeights, rect.h, childIds);
    let y = rect.y;
    entries.forEach((entry, i) => {
      out.push(
        layoutNode(
          entry.node,
          { x: rect.x, y, w: 0, h: heights[i] },
          path,
          depth + 1,
          weights,
          leaves,
        ),
      );
      y += heights[i];
    });
  } else if (rect.w > 0) {
    // 高为 0：沿仍有像素的宽度精确划分，所有后代均为零面积。
    const widths = largestRemainder(childWeights, rect.w, childIds);
    let x = rect.x;
    entries.forEach((entry, i) => {
      out.push(
        layoutNode(
          entry.node,
          { x, y: rect.y, w: widths[i], h: 0 },
          path,
          depth + 1,
          weights,
          leaves,
        ),
      );
      x += widths[i];
    });
  } else {
    for (const entry of entries) {
      out.push(
        layoutNode(entry.node, { ...rect }, path, depth + 1, weights, leaves),
      );
    }
  }
}
