import LinkedList from '../linked-list/LinkedList';

export default class Queue {
  linkedList: LinkedList;
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.tail;
  }

  peek() {
    if (!this.linkedList.head) {
      return null;
    }

    return this.linkedList.head.value;
  }

  enqueue(value: number | GraphVertex) {
    this.linkedList.append(value);
  }

  dequeue() {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  toString(callback: ((data: any) => string) | undefined) {
    return this.linkedList.toString(callback);
  }
}
