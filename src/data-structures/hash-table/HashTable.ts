import LinkedList from '../linked-list/LinkedList';
import LinkedListNode from '../linked-list/LinkedListNode';

// Hash table size directly affects on the number of collisions.
// The bigger the hash table size the less collisions you'll get.
// For demonstrating purposes hash table size is small to show how collisions
// are being handled.
const defaultHashTableSize = 32;

export default class HashTable {
  buckets: LinkedList[];
  keys: Record<string, any> = {};

  constructor(hashTableSize: number = defaultHashTableSize) {
    // Create hash table of certain size and fill each bucket with empty linked list.
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList());

    // Just to keep track of all actual keys in a fast way.
    this.keys = {};
  }

  /** Converts key string to hash number.*/
  hash(key: string): number {
    const hash = Array.from(key).reduce((hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0), 0);

    // Reduce hash number so it would fit hash table size.
    return hash % this.buckets.length;
  }

  set(key: string, value: string | Record<string, any>) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

    if (!node) {
      // Insert new node.
      bucketLinkedList.append({ key, value });
    } else {
      // Update value of existing node.
      node.value.value = value;
    }
  }

  delete(key: string): LinkedListNode | null {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

    if (node) return bucketLinkedList.delete(node.value);
    return null;
  }

  get(key: string): any {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  has(key: string): boolean {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys(): string[] {
    return Object.keys(this.keys);
  }
}
