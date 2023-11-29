export default class DoublyLinkedListNode {
  value: any;
  next: DoublyLinkedListNode | null;
  previous: null;

  constructor(value: any, next: DoublyLinkedListNode | null = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(callback: (arg: any) => any) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
