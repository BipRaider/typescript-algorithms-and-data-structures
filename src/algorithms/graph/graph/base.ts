export class NodeBase {
  next: null | NodeBase;
  data: any;

  constructor(data: any) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedListBase {
  head: any;
  constructor() {
    this.head = null;
  }

  insertAtHead(data: any) {
    let temp = new NodeBase(data);
    temp.next = this.head;
    this.head = temp;
    return this;
  }

  getHead() {
    return this.head;
  }
}

export class GraphBase {
  list: any[];
  vertices: number;

  constructor(vertices: number) {
    this.vertices = vertices;
    this.list = [];
    for (let i = 0; i < vertices; i++) {
      let temp = new LinkedListBase();
      this.list.push(temp);
    }
  }

  addEdge(source: number, destination: number) {
    if (source < this.vertices && destination < this.vertices) {
      this.list[source].insertAtHead(destination);
    }
    return this;
  }
}
