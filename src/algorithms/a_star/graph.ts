import { GraphNode } from './graph_node';

// Creates a Graph class used in the astar search algorithm.
export class Graph {
  nodes: GraphNode[][];
  input: any;

  constructor(grid: GraphNode[][]) {
    let nodes: GraphNode[][] = [];

    for (let x = 0; x < grid.length; x++) {
      nodes[x] = [];

      for (let y = 0, row = grid[x]; y < grid[x].length; y++) {
        nodes[x][y] = new GraphNode(x, y, row[y]);
      }
    }

    this.input = grid;
    this.nodes = nodes;
  }

  toString() {
    const nodes = this.nodes;

    let graphString = '\n';
    let rowDebug: string;
    let row: any;

    for (let x = 0; x < nodes.length; x++) {
      rowDebug = '';
      row = nodes[x];

      for (let y = 0; y < row.length; y++) rowDebug += row[y].type + ' ';

      graphString = graphString + rowDebug + '\n';
    }
    return graphString;
  }
}
