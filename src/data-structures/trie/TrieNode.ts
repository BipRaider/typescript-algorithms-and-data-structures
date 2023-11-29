import HashTable from '../hash-table/HashTable';

export default class TrieNode {
  character: string;
  isCompleteWord: boolean;
  children: HashTable;
  constructor(character: string, isCompleteWord = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new HashTable();
  }

  getChild(character: string) {
    return this.children.get(character);
  }

  addChild(character: string, isCompleteWord = false) {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }

    return this.children.get(character);
  }

  hasChild(character: string) {
    return this.children.has(character);
  }

  suggestChildren() {
    return [...this.children.getKeys()];
  }

  toString() {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
    const isCompleteString = this.isCompleteWord ? '*' : '';

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
