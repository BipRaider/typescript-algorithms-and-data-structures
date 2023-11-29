import { GraphBase } from './base';

const Colors = {
  WHITE: 'white',
  GRAY: 'gray',
  BLACK: 'black',
};

Object.freeze(Colors);

function isDeadlocked(g: GraphBase) {
  let color = [];

  for (let i = 0; i < g.vertices; i++) {
    color[i] = Colors.WHITE;
  }

  for (let i = 0; i < g.vertices; i++) {
    if (color[i] == Colors.WHITE) {
      if (detectCycle(g, i, color)) return true;
    }
  }
  return false;
}

function detectCycle(g: GraphBase, currentVertex: number, color: string[]) {
  color[currentVertex] = Colors.GRAY;
  let neighbor;
  let nextNode = g.list[currentVertex].getHead();
  while (nextNode !== null) {
    neighbor = nextNode.data;
    if (color[neighbor] == Colors.GRAY) {
      return true;
    }
    if (color[neighbor] == Colors.WHITE && detectCycle(g, neighbor, color)) {
      return true;
    }
  }
  color[currentVertex] = Colors.BLACK;
  return false;
}
let g = new GraphBase(3);
g.addEdge(0, 1);
g.addEdge(0, 2);
isDeadlocked(g);
