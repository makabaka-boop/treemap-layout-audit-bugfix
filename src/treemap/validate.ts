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

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * 校验权重树，非法时抛出 TreemapError（中文描述），合法时原样返回。
 * 约束：唯一可打印 ASCII id；深度（层数）≤ 4；叶子 ≤ 60；叶权重为正整数。
 */
export function validateTree(root: unknown): TreeNode {
  if (!isRecord(root)) fail('权重树必须是一个对象节点');

  const seen = new Set<string>();
  const visiting = new WeakSet<object>();
  let leafCount = 0;

  const validateId = (id: unknown): string => {
    if (typeof id !== 'string') fail('id 必须是字符串');
    if (id.length === 0) fail('id 不能为空');
    if (id.length > MAX_ID_LENGTH) fail(`id「${id}」长度不能超过 ${MAX_ID_LENGTH} 个字符`);
    if (!ID_PATTERN.test(id)) {
      fail(`id「${id}」只能包含可打印 ASCII 字符（不含空白）`);
    }
    if (seen.has(id)) fail(`节点 id「${id}」重复`);
    seen.add(id);
    return id;
  };

  const visit = (node: unknown, level: number): void => {
    if (!isRecord(node)) fail('权重树节点必须是对象');
    if (visiting.has(node)) fail('权重树不能包含循环引用');
    visiting.add(node);

    if (level > MAX_DEPTH_LEVELS) fail(`树深度（层数）超过 ${MAX_DEPTH_LEVELS}`);
    validateId(node.id);

    const hasWeight = Object.prototype.hasOwnProperty.call(node, 'weight');
    const hasChildren = Object.prototype.hasOwnProperty.call(node, 'children');
    if (hasWeight && hasChildren) {
      fail('节点不能同时包含 weight 和 children');
    }

    if (hasChildren) {
      if (!Array.isArray(node.children)) fail('children 必须是非空数组');
      if (node.children.length === 0) fail('内部节点的 children 不能为空');
      for (const child of node.children) visit(child, level + 1);
    } else if (hasWeight) {
      const { weight } = node;
      if (
        typeof weight !== 'number' ||
        !Number.isInteger(weight) ||
        weight < 1 ||
        weight > MAX_WEIGHT
      ) {
        fail(`叶子「${String(node.id)}」权重必须是 1～${MAX_WEIGHT.toLocaleString('en-US')} 的正整数`);
      }
      leafCount += 1;
      if (leafCount > MAX_LEAVES) fail(`叶子数量不能超过 ${MAX_LEAVES}`);
    } else {
      fail(`节点「${String(node.id)}」必须包含 weight 或非空 children`);
    }
  };

  visit(root, 1);
  return root as unknown as TreeNode;
}

/** 校验画布尺寸：300～900 的整数像素。 */
export function validateCanvasSize(
  width: unknown,
  height: unknown,
): { width: number; height: number } {
  const validateOne = (value: unknown, name: string): number => {
    if (typeof value !== 'number' || !Number.isInteger(value)) {
      fail(`画布${name}必须是整数像素`);
    }
    if (value < MIN_CANVAS || value > MAX_CANVAS) {
      fail(`画布${name}必须在 ${MIN_CANVAS}～${MAX_CANVAS} px 之间`);
    }
    return value;
  };

  return {
    width: validateOne(width, '宽'),
    height: validateOne(height, '高'),
  };
}
