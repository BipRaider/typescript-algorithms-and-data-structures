class GraphVertex {
  getKey() {
    throw new Error('Method not implemented.');
  }
  value: string;
  edges: GraphVertex[];

  constructor(value: string | number) {
    this.value = value.toString();
    this.edges = [];
  }
}

function cloneGraph(g: GraphVertex) {
  if (g === null) return null;

  let vertexMap: Record<string, GraphVertex> = {};
  let queue = [g];

  vertexMap[g.value] = new GraphVertex(g.value);

  while (queue.length) {
    let currentVertex = queue.shift();
    if (currentVertex) {
      currentVertex.edges.forEach((v: GraphVertex) => {
        if (!vertexMap[v.value]) {
          vertexMap[v.value] = new GraphVertex(v.value);
          queue.push(v);
        }

        if (currentVertex) vertexMap[currentVertex.value].edges.push(vertexMap[v.value]);
      });
    }
  }
  return vertexMap[g.value];
}

let n1 = new GraphVertex(1);
let n2 = new GraphVertex(2);
let n3 = new GraphVertex(3);
let n4 = new GraphVertex(4);

n1.edges.push(n2, n4);
n2.edges.push(n1, n3);
n3.edges.push(n2, n4);
n4.edges.push(n1, n3);

cloneGraph(n1);
