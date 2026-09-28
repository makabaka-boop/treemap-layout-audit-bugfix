import { describe, expect, it } from 'vitest';
import { countLeaves, treeDepth, updateLeafWeight } from './tree-utils';
import type { TreeNode } from './types';

describe('updateLeafWeight', () => {
  const tree: TreeNode = {
    id: 'root',
    children: [
      {
        id: 'first',
        children: [
          { id: 'a1', weight: 1 },
          { id: 'a2', weight: 2 },
        ],
      },
      {
        id: 'second',
        children: [
          { id: 'b1', weight: 3 },
          { id: 'b2', weight: 4 },
        ],
      },
      {
        id: 'third',
        children: [{ id: 'c1', weight: 5 }],
      },
    ],
  };

  it('更新首个分支内叶子（不改变其他节点）', () => {
    const next = updateLeafWeight(tree, 'a2', 99);
    const find = (t: TreeNode, id: string): TreeNode | undefined => {
      if (t.id === id) return t;
      return t.children?.map((c) => find(c, id)).find(Boolean);
    };
    expect(find(next, 'a2')!.weight).toBe(99);
    expect(find(next, 'b2')!.weight).toBe(4);
    // 原树不被修改（不可变更新）
    expect(find(tree, 'a2')!.weight).toBe(2);
  });

  it('更新第二个及之后分支内叶子也生效（回归：曾只递归第一个子节点）', () => {
    for (const [id, w] of [
      ['b1', 70],
      ['b2', 80],
      ['c1', 90],
    ] as const) {
      const next = updateLeafWeight(tree, id, w);
      const find = (t: TreeNode, target: string): TreeNode | undefined => {
        if (t.id === target) return t;
        return t.children?.map((c) => find(c, target)).find(Boolean);
      };
      expect(find(next, id)!.weight).toBe(w);
    }
    expect(countLeaves(tree)).toBe(5);
    expect(treeDepth(tree)).toBe(3);
  });

  it('目标 id 不存在时返回结构相同但不共享被遍历引用的树（其他权重不变）', () => {
    const next = updateLeafWeight(tree, 'nope', 1);
    const collect = (t: TreeNode): number[] =>
      t.children ? t.children.flatMap(collect) : [t.weight!];
    expect(collect(next)).toEqual([1, 2, 3, 4, 5]);
  });
});
