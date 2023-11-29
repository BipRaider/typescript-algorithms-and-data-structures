// javascript-astar
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a binary heap.

import { BinaryHeap } from './binary';
import { IGraphNode } from './graph_node';

export class Astar {
  static init(grid: any[][]): any[] {
    let nodes: IGraphNode[] = [];
    for (let x = 0, xl = grid.length; x < xl; x++) {
      for (let y = 0, yl = grid[x].length; y < yl; y++) {
        // TODO: should add a setting by link.
        let node = grid[x][y];
        node.f = 0;
        node.g = 0;
        node.h = 0;
        node.cost = node.type;
        node.visited = false;
        node.closed = false;
        node.parent = null;
        nodes.push(node);
      }
    }
    return nodes;
  }

  static heap() {
    return new BinaryHeap(function (node: { f: any }) {
      return node.f;
    });
  }

  static search(grid: any[][], start: any, end: { pos: any }, diagonal: any, heuristic: (arg0: any, arg1: any) => any) {
    Astar.init(grid);
    heuristic = heuristic || Astar.manhattan;
    // diagonal = !!diagonal;

    const openHeap = Astar.heap();

    openHeap.push(start);

    while (openHeap.size() > 0) {
      // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
      const currentNode = openHeap.pop();

      // End case -- result has been found, return the traced path.
      if (currentNode === end) {
        let curr = currentNode;
        const ret = [];

        while (curr.parent) {
          ret.push(curr);
          curr = curr.parent;
        }

        return ret.reverse();
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors.
      currentNode.closed = true;

      // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
      const neighbors = Astar.neighbors(grid, currentNode, diagonal);

      for (let i = 0, il = neighbors.length; i < il; i++) {
        const neighbor = neighbors[i];

        // Not a valid node to process, skip to next neighbor.
        if (neighbor.closed || neighbor.isWall()) continue;

        // The g score is the shortest distance from start to current node.
        // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
        const gScore = currentNode.g + neighbor.cost;
        const beenVisited = neighbor.visited;

        if (!beenVisited || gScore < neighbor.g) {
          // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
          neighbor.visited = true;
          neighbor.parent = currentNode;
          neighbor.h = neighbor.h || heuristic(neighbor.pos, end.pos);
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;

          if (!beenVisited) {
            // Pushing to heap will put it in proper place based on the 'f' value.
            openHeap.push(neighbor);
          } else {
            // Already seen the node, but since it has been rescored we need to reorder it in the heap
            openHeap.rescoreElement(neighbor);
          }
        }
      }
    }

    // No result was found - empty array signifies failure to find path.
    return [];
  }

  static manhattan(pos0: { x: number; y: number }, pos1: { x: number; y: number }) {
    // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
    const d1 = Math.abs(pos1.x - pos0.x);
    const d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
  }

  static neighbors(grid: { [x: string]: any }[], node: { x: any; y: any }, diagonals: string) {
    const ret = [];
    const x = node.x;
    const y = node.y;

    const x_plus = x + 1;
    const x_minus = x - 1;
    const y_plus = y + 1;
    const y_minus = y - 1;

    const west = grid[x_minus] && grid[x_minus][y];
    const east = grid[x_plus] && grid[x_plus][y];
    const south = grid[x] && grid[x][y_minus];
    const north = grid[x] && grid[x][y_plus];

    const southwest = grid[x_minus] && grid[x_minus][y_minus];
    const southeast = grid[x_plus] && grid[x_plus][y_minus];
    const northwest = grid[x_minus] && grid[x_minus][y_plus];
    const northeast = grid[x_plus] && grid[x_plus][y_plus];

    if (west) ret.push(grid[x_minus][y]);
    if (east) ret.push(grid[x_plus][y]);
    if (south) ret.push(grid[x][y_minus]);
    if (north) ret.push(grid[x][y_plus]);

    if (diagonals === 'EuclideanFree') {
      if (southwest) ret.push(grid[x_minus][y_minus]);
      if (southeast) ret.push(grid[x_plus][y_minus]);
      if (northwest) ret.push(grid[x_minus][y_plus]);
      if (northeast) ret.push(grid[x_plus][y_plus]);
    } else if (diagonals === 'Euclidean') {
      // In order to have nice diagonal straight lines between two nodes on a blank table (and other situations as well)
      if (southwest) {
        const parGrid1 = grid[x][y_minus].closed || grid[x][y_minus].isWall();
        const parGrid2 = grid[x_minus][y].closed || grid[x_minus][y].isWall();
        //push if no wall in the south and no wall in the west
        if (!parGrid1 && !parGrid2) ret.push(grid[x_minus][y_minus]);
      }
      if (southeast) {
        const parGrid1 = grid[x][y_minus].closed || grid[x][y_minus].isWall();
        const parGrid2 = grid[x_plus][y].closed || grid[x_plus][y].isWall();
        //push if no wall in the south and no wall in the east
        if (!parGrid1 && !parGrid2) ret.push(grid[x_plus][y_minus]);
      }
      if (northwest) {
        const parGrid1 = grid[x][y_plus].closed || grid[x][y_plus].isWall();
        const parGrid2 = grid[x_minus][y].closed || grid[x_minus][y].isWall();
        //push if no wall in the north and no wall in the west
        if (!parGrid1 && !parGrid2) ret.push(grid[x_minus][y_plus]);
      }
      if (northeast) {
        const parGrid1 = grid[x][y_plus].closed || grid[x][y_plus].isWall();
        const parGrid2 = grid[x_plus][y].closed || grid[x_plus][y].isWall();
        //push if no wall in the north and no wall in the east
        if (!parGrid1 && !parGrid2) ret.push(grid[x_plus][y_plus]);
      }
    }
    return ret;
  }
}
