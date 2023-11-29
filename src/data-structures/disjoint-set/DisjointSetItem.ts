import GraphVertex from '../graph/GraphVertex';

export default class DisjointSetItem {
  value: any;
  keyCallback: {
    (graphVertex: GraphVertex): any;
    (graphVertex: any): any;
  } | null;

  parent: DisjointSetItem | null;
  children: Record<string, any> = {};

  constructor(
    value: any,
    keyCallback?: {
      (graphVertex: GraphVertex): any;
      (graphVertex: any): any;
    },
  ) {
    this.value = value;
    this.keyCallback = keyCallback || null;
    this.parent = null;
    this.children = {};
  }

  getKey(): any {
    // Allow user to define custom key generator.
    if (this.keyCallback) return this.keyCallback(this.value);
    // Otherwise use value as a key by default.
    return this.value;
  }

  getRoot(): DisjointSetItem {
    return this.parent === null ? this : this.parent.getRoot();
  }

  isRoot(parent = this.parent): parent is DisjointSetItem {
    return this.parent === null;
  }

  /**
   * Rank basically means the number of all ancestors.
   */
  getRank(): number {
    if (this.getChildren().length === 0) {
      return 0;
    }

    let rank = 0;

    /** @var {DisjointSetItem} child */
    this.getChildren().forEach(child => {
      // Count child itself.
      rank += 1;

      // Also add all children of current child.
      rank += child.getRank();
    });

    return rank;
  }

  getChildren(): DisjointSetItem[] {
    return Object.values(this.children);
  }

  setParent(parentItem: DisjointSetItem, forceSettingParentChild: boolean = true): DisjointSetItem {
    this.parent = parentItem;
    if (forceSettingParentChild) {
      parentItem.addChild(this);
    }

    return this;
  }

  addChild(childItem: DisjointSetItem): DisjointSetItem {
    this.children[childItem.getKey()] = childItem;
    childItem.setParent(this, false);

    return this;
  }
}
