import BinaryTreeNode from '../../data-structures/tree/BinaryTreeNode';

export default class Comparator {
  compare: Function;

  constructor(compareFunction?: Function | undefined) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  static defaultCompareFunction(a: string | number, b: string | number): -1 | 1 | 0 {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }

  equal(a: string | number | BinaryTreeNode, b: string | number | BinaryTreeNode | null): boolean {
    return this.compare(a, b) === 0;
  }

  lessThan(a: string | number, b: string | number): boolean {
    return this.compare(a, b) < 0;
  }

  greaterThan(a: string | number, b: string | number): boolean {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a: string | number, b: string | number): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a: string | number, b: string | number): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse(): void {
    const compareOriginal = this.compare;
    this.compare = (a: any, b: any) => compareOriginal(b, a);
  }
}
