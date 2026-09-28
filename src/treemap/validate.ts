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
 * 约束：唯一可打印 ASCII id；深度（层数）≤ 4；叶子 ≤ 60；叶权重为正整数。
 */
export function validateTree(root: unknown): TreeNode {
  if (root === null || typeof root !== 'object' || Array.isArray(root)) {
    fail('权重树必须是一个对象节点')
  }
  const visit = (node: TreeNode, level: number): void => {
    if (level > MAX_DEPTH_LEVELS) fail(`树深度（层数）超过 ${MAX_DEPTH_LEVELS}`)
    if (!node.id) fail('id 不能为空')
    if (isLeaf(node)) {
      if (!Number.isInteger(node.weight) || node.weight! < 1) fail('叶子权重必须是正整数')
    } else {
      for (const child of node.children!) visit(child, level + 1)
    }
  }
  visit(root as TreeNode, 1)
  return root as TreeNode
}

/** 校验画布尺寸：300～900 的整数像素。 */
export function validateCanvasSize(
  width: unknown,
  height: unknown,
): { width: number; height: number } {
  return { width: Number(width), height: Number(height) }
}
