import type { TreeNode } from './types';

/** 树深度上限（层数，根为第 1 层） */
export const MAX_DEPTH_LEVELS = 4;
/** 叶子数量上限 */
export const MAX_LEAVES = 60;
/** 画布边长范围（像素，含端点） */
export const MIN_CANVAS = 300;
export const MAX_CANVAS = 900;
/** 单叶权重上限（正整数；保证 权重×画布边长 远小于 2^53，整数运算精确） */
export const MAX_WEIGHT = 1_000_000;
/** id 只允许可打印 ASCII（0x21–0x7E，不含空白） */
export const ID_PATTERN = /^[!-~]+$/;
export const MAX_ID_LENGTH = 32;

export class TreemapError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TreemapError';
  }
}

export function isLeaf(node: TreeNode): boolean {
  return node.children === undefined;
}

function fail(message: string): never {
  throw new TreemapError(message);
}

/**
 * 校验权重树，非法时抛出 TreemapError（中文描述），合法时原样返回。
 * 约束：唯一可打印 ASCII id（≤ 32 字符）；深度（层数）≤ 4；叶子 ≤ 60；
 * 叶权重为 1～1,000,000 的正整数；内部节点 children 为非空数组且不得兼带 weight。
 */
export function validateTree(root: unknown): TreeNode {
  if (root === null || typeof root !== 'object' || Array.isArray(root)) {
    fail('权重树必须是一个对象节点')
  }
  const seen = new Set<string>()
  const visit = (node: unknown, level: number): number => {
    if (node === null || typeof node !== 'object' || Array.isArray(node)) {
      fail('树节点必须是对象')
    }
    if (level > MAX_DEPTH_LEVELS) fail(`树深度（层数）超过 ${MAX_DEPTH_LEVELS}`)
    const n = node as Record<string, unknown>

    const id = n.id
    if (typeof id !== 'string' || id.length === 0) fail('id 不能为空')
    if (id.length > MAX_ID_LENGTH) fail(`id 长度不能超过 ${MAX_ID_LENGTH} 个字符：${id}`)
    if (!ID_PATTERN.test(id)) fail(`id 只能包含可打印 ASCII 字符（不含空白）：${id}`)
    if (seen.has(id)) fail(`存在重复的节点 id：${id}`)
    seen.add(id)

    const hasChildren = 'children' in n && n.children !== undefined
    const hasWeight = 'weight' in n && n.weight !== undefined
    if (hasChildren && hasWeight) fail(`节点「${id}」不能同时携带 weight 和 children`)

    if (!hasChildren) {
      if (!hasWeight) fail(`叶子节点「${id}」缺少 weight`)
      const w = n.weight
      if (typeof w !== 'number' || !Number.isInteger(w) || w < 1 || w > MAX_WEIGHT) {
        fail(`叶子「${id}」的权重必须是 1～${MAX_WEIGHT.toLocaleString('en-US')} 的正整数`)
      }
      return 1
    }

    if (!Array.isArray(n.children) || n.children.length === 0) {
      fail(`内部节点「${id}」的 children 必须是非空数组`)
    }
    let leaves = 0
    for (const child of n.children as unknown[]) leaves += visit(child, level + 1)
    if (leaves > MAX_LEAVES) fail(`叶子数量超过 ${MAX_LEAVES}（当前 ${leaves} 个）`)
    return leaves
  }
  visit(root, 1)
  return root as TreeNode
}

/** 校验画布尺寸：300～900 的整数像素。 */
export function validateCanvasSize(
  width: unknown,
  height: unknown,
): { width: number; height: number } {
  const check = (v: unknown, which: string): number => {
    if (
      typeof v !== 'number' ||
      !Number.isFinite(v) ||
      !Number.isInteger(v) ||
      v < MIN_CANVAS ||
      v > MAX_CANVAS
    ) {
      fail(`画布${which}必须是 ${MIN_CANVAS}～${MAX_CANVAS} 之间的整数像素`)
    }
    return v
  }
  return { width: check(width, '宽'), height: check(height, '高') }
}
