import Comparator from '../../utils/comparator/Comparator';
import HashTable from '../hash-table/HashTable';

export default class BinaryTreeNode {
  insert(value: any) {
    throw new Error('Method not implemented.');
  }
  find(value: any) {
    throw new Error('Method not implemented.');
  }
  findMin() {
    throw new Error('Method not implemented.');
  }
  left: null | BinaryTreeNode;
  right: null | BinaryTreeNode;
  parent: null | BinaryTreeNode;
  value: any;
  meta: HashTable;
  nodeComparator: Comparator;
  /**
   * @param {*} [value] - node value.
   */
  constructor(value: any = null) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    // Any node related meta information may be stored here.
    this.meta = new HashTable();

    // This comparator is used to compare binary tree nodes with each other.
    this.nodeComparator = new Comparator();
  }

  /**
   * @return {number}
   */
  get leftHeight(): number {
    if (!this.left) return 0;

    return this.left.height + 1;
  }

  /**
   * @return {number}
   */
  get rightHeight(): number {
    if (!this.right) {
      return 0;
    }

    return this.right.height + 1;
  }

  /**
   * @return {number}
   */
  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  /**
   * @return {number}
   */
  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * Get parent's sibling if it exists.
   * @return {BinaryTreeNode}
   */
  get uncle(): BinaryTreeNode | undefined {
    // Check if current node has parent.
    if (!this.parent) return undefined;
    // Check if current node has grand-parent.
    if (!this.parent.parent) return undefined;
    // Check if grand-parent has two children.
    if (!this.parent.parent.left || !this.parent.parent.right) return undefined;
    // So for now we know that current node has grand-parent and this
    // grand-parent has two children. Let's find out who is the uncle.
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      // Right one is an uncle.
      return this.parent.parent.right;
    }
    // Left one is an uncle.
    return this.parent.parent.left;
  }

  /**
   * @param {*} value
   * @return {BinaryTreeNode}
   */
  setValue(value: any): this {
    this.value = value;
    return this;
  }

  /**
   * @param {BinaryTreeNode} node
   * @return {BinaryTreeNode}
   */
  setLeft(node: BinaryTreeNode | null): BinaryTreeNode {
    // Reset parent for left node since it is going to be detached.
    if (this.left) this.left.parent = null;
    // Attach new node to the left.
    this.left = node;
    // Make current node to be a parent for new left one.
    if (this.left) this.left.parent = this;
    return this;
  }

  /**
   * @param {BinaryTreeNode} node
   * @return {BinaryTreeNode}
   */
  setRight(node: BinaryTreeNode | null): BinaryTreeNode {
    // Reset parent for right node since it is going to be detached.
    if (this.right) this.right.parent = null;
    // Attach new node to the right.
    this.right = node;
    // Make current node to be a parent for new right one.
    if (node && this.right) this.right.parent = this;
    return this;
  }

  /**
   * @param {BinaryTreeNode} nodeToRemove
   * @return {boolean}
   */
  removeChild(nodeToRemove: BinaryTreeNode | null): boolean {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null;
      return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null;
      return true;
    }

    return false;
  }

  /**
   * @param {BinaryTreeNode} nodeToReplace
   * @param {BinaryTreeNode} replacementNode
   * @return {boolean}
   */
  replaceChild(nodeToReplace: BinaryTreeNode | null, replacementNode: BinaryTreeNode | null): boolean {
    if (!nodeToReplace || !replacementNode) return false;

    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode;
      return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode;
      return true;
    }

    return false;
  }

  /**
   * @param {BinaryTreeNode} sourceNode
   * @param {BinaryTreeNode} targetNode
   */
  static copyNode(sourceNode: BinaryTreeNode, targetNode: BinaryTreeNode) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  /**
   * @return {*[]}
   */
  traverseInOrder(): any[] {
    let traverse: any = [];
    // Add left node.
    if (this.left) traverse = traverse.concat(this.left.traverseInOrder());
    // Add root.
    traverse.push(this.value);
    // Add right node.
    if (this.right) traverse = traverse.concat(this.right.traverseInOrder());
    return traverse;
  }

  /**
   * @return {string}
   */
  toString(): string {
    return this.traverseInOrder().toString();
  }
}
