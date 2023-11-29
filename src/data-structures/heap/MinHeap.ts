import Comparator from '../../utils/comparator/Comparator';
import GraphEdge from '../graph/GraphEdge';

export default class MinHeap {
  heapContainer: number[];
  compare: Comparator;
  /**
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction: Function | undefined) {
    // Array representation of the heap.
    this.heapContainer = [];
    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * @param {number} parentIndex
   * @return {number}
   */
  getLeftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1;
  }

  /**
   * @param {number} parentIndex
   * @return {number}
   */
  getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  /**
   * @param {number} childIndex
   * @return {number}
   */
  getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * @param {number} childIndex
   * @return {boolean}
   */
  hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0;
  }

  /**
   * @param {number} parentIndex
   * @return {boolean}
   */
  hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * @param {number} parentIndex
   * @return {boolean}
   */
  hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * @param {number} parentIndex
   * @return {*}
   */
  leftChild(parentIndex: number): any {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  /**
   * @param {number} parentIndex
   * @return {*}
   */
  rightChild(parentIndex: number): any {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  /**
   * @param {number} childIndex
   * @return {*}
   */
  parent(childIndex: number): any {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  /**
   * @param {number} indexOne
   * @param {number} indexTwo
   */
  swap(indexOne: number, indexTwo: number): void {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  peek(): null | number {
    if (this.heapContainer.length === 0) return null;
    return this.heapContainer[0];
  }

  poll(): null | number | undefined | GraphVertex | GraphEdge {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];

    // Move the last element from the end to the head.
    this.heapContainer[0] = this.heapContainer.pop() as number;
    this.heapifyDown();

    return item;
  }

  /**
   * @param {*} item
   * @return {MinHeap}
   */
  add(item: number): MinHeap {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  /**
   * @param {*} item
   * @param {Comparator} [customFindingComparator]
   * @return {MinHeap}
   */
  remove(item: number, customFindingComparator: Comparator | undefined): MinHeap {
    // Find number of items to remove.
    const customComparator = customFindingComparator || this.compare;
    const numberOfItemsToRemove = this.find(item, customComparator).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      // We need to find item index to remove each time after removal since
      // indices are being change after each heapify process.
      const indexToRemove = this.find(item, customComparator).pop();

      // If we need to remove last child in the heap then just remove it.
      // There is no need to heapify the heap afterwards.
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        // Move last element in heap to the vacant (removed) position.
        this.heapContainer[indexToRemove] = this.heapContainer.pop();

        // Get parent.
        const parentItem = this.hasParent(indexToRemove) ? this.parent(indexToRemove) : null;
        const leftChild = this.hasLeftChild(indexToRemove) ? this.leftChild(indexToRemove) : null;

        // If there is no parent or parent is less then node to delete then heapify down.
        // Otherwise heapify up.
        if (
          leftChild !== null &&
          (parentItem === null || this.compare.lessThan(parentItem, this.heapContainer[indexToRemove]))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  /**
   * @param {*} item
   * @param {Comparator} [customComparator]
   * @return {Number[]}
   */
  find(item: number, customComparator: Comparator | undefined): number[] {
    const foundItemIndices = [];
    const comparator = customComparator || this.compare;

    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex);
      }
    }

    return foundItemIndices;
  }

  /**
   * @param {number} [customStartIndex]
   */
  heapifyUp(customStartIndex?: number | undefined) {
    // Take last element (last in array or the bottom left in a tree) in
    // a heap container and lift him up until we find the parent element
    // that is less then the current new one.
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex) &&
      this.compare.lessThan(this.heapContainer[currentIndex], this.parent(currentIndex))
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /**
   * @param {number} [customStartIndex]
   */
  heapifyDown(customStartIndex?: number | undefined) {
    // Compare the root element to its children and swap root with the smallest
    // of children. Do the same for next children after swap.
    let currentIndex = customStartIndex || 0;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.compare.lessThan(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (this.compare.lessThan(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.heapContainer.length;
  }

  /**
   * @return {string}
   */
  toString() {
    return this.heapContainer.toString();
  }
}
