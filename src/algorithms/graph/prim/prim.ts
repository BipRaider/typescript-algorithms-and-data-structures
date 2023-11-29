import Graph from '../../../data-structures/graph/Graph';
import GraphEdge from '../../../data-structures/graph/GraphEdge';
import PriorityQueue from '../../../data-structures/priority-queue/PriorityQueue';

export default function prim(graph: Graph): Graph {
  // It should fire error if graph is directed since the algorithm works only
  // for undirected graphs.
  if (graph.isDirected) {
    throw new Error("Prim's algorithms works only for undirected graphs");
  }

  // Init new graph that will contain minimum spanning tree of original graph.
  const minimumSpanningTree = new Graph();

  // This priority queue will contain all the edges that are starting from
  // visited nodes and they will be ranked by edge weight - so that on each step
  // we would always pick the edge with minimal edge weight.
  const edgesQueue = new PriorityQueue();

  // Set of vertices that has been already visited.
  const visitedVertices: Record<string, any> = {};

  // Vertex from which we will start graph traversal.
  const startVertex = graph.getAllVertices()[0];

  // Add start vertex to the set of visited ones.
  visitedVertices[startVertex.getKey()] = startVertex;

  // Add all edges of start vertex to the queue.
  startVertex.getEdges().forEach((graphEdge: { weight: number | undefined }) => {
    edgesQueue.add(graphEdge, graphEdge.weight);
  });

  // Now let's explore all queued edges.
  while (!edgesQueue.isEmpty()) {
    // Fetch next queued edge with minimal weight.
    const currentMinEdge: GraphEdge = edgesQueue.poll();

    // Find out the next unvisited minimal vertex to traverse.
    let nextMinVertex = null;
    if (!visitedVertices[currentMinEdge.startVertex.getKey()]) {
      nextMinVertex = currentMinEdge.startVertex;
    } else if (!visitedVertices[currentMinEdge.endVertex.getKey()]) {
      nextMinVertex = currentMinEdge.endVertex;
    }

    // If all vertices of current edge has been already visited then skip this round.
    if (nextMinVertex) {
      // Add current min edge to MST.
      minimumSpanningTree.addEdge(currentMinEdge);

      // Add vertex to the set of visited ones.
      visitedVertices[nextMinVertex.getKey()] = nextMinVertex;

      // Add all current vertex's edges to the queue.
      nextMinVertex
        .getEdges()
        .forEach(
          (graphEdge: {
            startVertex: { getKey: () => string | number };
            endVertex: { getKey: () => string | number };
            weight: number | undefined;
          }) => {
            // Add only vertices that link to unvisited nodes.
            if (!visitedVertices[graphEdge.startVertex.getKey()] || !visitedVertices[graphEdge.endVertex.getKey()]) {
              edgesQueue.add(graphEdge, graphEdge.weight);
            }
          },
        );
    }
  }

  return minimumSpanningTree;
}
