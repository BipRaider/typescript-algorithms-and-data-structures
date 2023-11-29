export default class LinkedListNode {
  value: any;
  next: LinkedListNode | null;
  constructor(value: any, next: LinkedListNode | null = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback?: (data: any) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
