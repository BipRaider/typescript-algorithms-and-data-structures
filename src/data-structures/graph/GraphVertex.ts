import LinkedList from '../linked-list/LinkedList';
import LinkedListNode from '../linked-list/LinkedListNode';
import GraphEdge from './GraphEdge';

export default class GraphVertex {
  value: any;
  edges: LinkedList;

  constructor(value?: any) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }

    const edgeComparator = (edgeA: GraphEdge, edgeB: GraphEdge) => {
      if (edgeA.getKey() === edgeB.getKey()) return 0;
      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    };

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value;
    this.edges = new LinkedList(edgeComparator);
  }

  addEdge(edge: GraphEdge): this {
    this.edges.append(edge);
    return this;
  }

  deleteEdge(edge: GraphEdge) {
    this.edges.delete(edge);
  }

  getNeighbors(): GraphVertex[] {
    const edges = this.edges.toArray();

    const neighborsConverter = (node: LinkedListNode) => {
      return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
    };

    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return edges.map(neighborsConverter);
  }

  getEdges(): GraphEdge[] {
    return this.edges.toArray().map(linkedListNode => linkedListNode.value);
  }

  getDegree(): number {
    return this.edges.toArray().length;
  }

  hasEdge(requiredEdge: GraphEdge): boolean {
    const callback = (edge: GraphEdge) => edge === requiredEdge;
    const edgeNode = this.edges.find({ callback });
    if (edgeNode === null) return false;
    return true;
  }

  hasNeighbor(vertex: GraphVertex): boolean {
    const callback = (edge: GraphEdge): boolean => edge.startVertex === vertex || edge.endVertex === vertex;

    const vertexNode = this.edges.find({ callback });

    return !!vertexNode;
  }

  findEdge(vertex: GraphVertex): GraphEdge | null {
    const callback = (edge: GraphEdge): boolean => {
      return edge.startVertex === vertex || edge.endVertex === vertex;
    };

    const edge = this.edges.find({ callback });

    return edge ? edge.value : null;
  }

  getKey(): string {
    return this.value;
  }

  deleteAllEdges(): GraphVertex {
    this.getEdges().forEach(edge => this.deleteEdge(edge));

    return this;
  }

  toString(callback?: (...val: any) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
