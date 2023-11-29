import LinkedList from '../linked-list/LinkedList';

export default class Stack {
  linkedList: LinkedList;
  constructor() {
    this.linkedList = new LinkedList();
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.linkedList.tail;
  }

  /**
   * @return {*}
   */
  peek(): any {
    if (this.isEmpty()) return null;
    if (this.linkedList === null) return null;

    return this.linkedList.tail?.value;
  }

  /**
   * @param {*} value
   */
  push(value: any) {
    this.linkedList.append(value);
  }

  /**
   * @return {*}
   */
  pop() {
    const removedTail = this.linkedList.deleteTail();
    return removedTail ? removedTail.value : null;
  }

  /**
   * @return {*[]}
   */
  toArray() {
    return this.linkedList
      .toArray()
      .map(linkedListNode => linkedListNode.value)
      .reverse();
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback: ((data: any) => string) | undefined) {
    return this.linkedList.toString(callback);
  }
}
