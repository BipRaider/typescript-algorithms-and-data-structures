import MinHeap from '../heap/MinHeap';
import Comparator from '../../utils/comparator/Comparator';

// It is the same as min heap except that when comparing to elements
// we take into account not element's value but rather its priority.
export default class PriorityQueue extends MinHeap {
  priorities: Record<string, any> = {};

  constructor() {
    super(() => {});
    this.priorities = {};
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  /**
   * @param {*} item
   * @param {number} [priority]
   * @return {PriorityQueue}
   */
  add(item: any, priority: number = 0): PriorityQueue {
    this.priorities[item] = priority;
    super.add(item);

    return this;
  }

  /**
   * @param {*} item
   * @param {Comparator} [customFindingComparator]
   * @return {PriorityQueue}
   */
  remove(item: any, customFindingComparator: Comparator): PriorityQueue {
    super.remove(item, customFindingComparator);
    delete this.priorities[item];

    return this;
  }

  /**
   * @param {*} item
   * @param {number} priority
   * @return {PriorityQueue}
   */
  changePriority(item: any, priority: number): PriorityQueue {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);

    return this;
  }

  /**
   * @param {*} item
   * @return {Number[]}
   */
  findByValue(item: any): number[] {
    return this.find(item, new Comparator(this.compareValue));
  }

  /**
   * @param {*} item
   * @return {boolean}
   */
  hasValue(item: any): boolean {
    return this.findByValue(item).length > 0;
  }

  /**
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  comparePriority(a: any, b: any): number {
    if (this.priorities[a] === this.priorities[b]) {
      return 0;
    }

    return this.priorities[a] < this.priorities[b] ? -1 : 1;
  }

  /**
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  compareValue(a: any, b: any): number {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }
}
