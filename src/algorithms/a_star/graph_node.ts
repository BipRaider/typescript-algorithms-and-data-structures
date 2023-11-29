enum GraphNodeType {
  OPEN = 0,
  WALL = 1,
  START = 2,
  END = 3,
}

export interface IGraphNode extends GraphNode {
  f: number;
  g: number;
  h: number;
  cost: GraphNode['type'];
  visited: boolean;
  closed: boolean;
  parent: null | IGraphNode;
}

export class GraphNode {
  x: number;
  y: number;
  data: Record<string, any>;
  pos: {
    x: number;
    y: number;
  };

  type: GraphNode | number;

  constructor(x: number, y: number, type: GraphNode | number) {
    this.data = {};
    this.x = x;
    this.y = y;
    this.pos = { x, y };
    this.type = type;
  }

  toString = (): string => '[' + this.x + ' ' + this.y + ']';

  isWall = (): boolean => this.type == GraphNodeType.WALL;
}
