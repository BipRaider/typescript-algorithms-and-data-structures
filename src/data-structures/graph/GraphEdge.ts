import GraphVertex from './GraphVertex';

export default class GraphEdge {
  startVertex: GraphVertex;
  endVertex: GraphVertex;
  weight: number;

  constructor(startVertex: GraphVertex, endVertex: GraphVertex, weight: number = 0) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }

  getKey(): string {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();
    return `${startVertexKey}_${endVertexKey}`;
  }

  reverse(): this {
    const tmp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tmp;
    return this;
  }

  toString(): string {
    return this.getKey();
  }
}
