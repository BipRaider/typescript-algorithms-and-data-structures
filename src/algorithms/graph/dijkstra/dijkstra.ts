import Graph from '../../../data-structures/graph/Graph';
import GraphVertex from '../../../data-structures/graph/GraphVertex';
import PriorityQueue from '../../../data-structures/priority-queue/PriorityQueue';

/**
 * @param {Graph} graph
 * @param {GraphVertex} startVertex
 */
export default function dijkstra(graph: Graph, startVertex: GraphVertex) {
  const distances: Record<string, any> = {};
  const visitedVertices: Record<string, any> = {};
  const previousVertices: Record<string, any> = {};
  const queue = new PriorityQueue();

  // Init all distances with infinity assuming that currently we can't reach
  // any of the vertices except start one.
  graph.getAllVertices().forEach((vertex: GraphVertex) => {
    distances[vertex.getKey()] = Infinity;
    previousVertices[vertex.getKey()] = null;
  });
  distances[startVertex.getKey()] = 0;

  // Init vertices queue.
  queue.add(startVertex, distances[startVertex.getKey()]);

  while (!queue.isEmpty()) {
    const currentVertex: GraphVertex = queue.poll();

    graph.getNeighbors(currentVertex).forEach((neighbor: GraphVertex) => {
      // Don't visit already visited vertices.
      if (!visitedVertices[neighbor.getKey()]) {
        // Update distances to every neighbor from current vertex.
        const edge = graph.findEdge(currentVertex, neighbor);

        const existingDistanceToNeighbor = distances[neighbor.getKey()];
        const distanceToNeighborFromCurrent = distances[currentVertex.getKey()] + edge!.weight;

        if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
          distances[neighbor.getKey()] = distanceToNeighborFromCurrent;

          // Change priority.
          if (queue.hasValue(neighbor)) {
            queue.changePriority(neighbor, distances[neighbor.getKey()]);
          }

          // Remember previous vertex.
          previousVertices[neighbor.getKey()] = currentVertex;
        }

        // Add neighbor to the queue for further visiting.
        if (!queue.hasValue(neighbor)) {
          queue.add(neighbor, distances[neighbor.getKey()]);
        }
      }
    });

    // Add current vertex to visited ones.
    visitedVertices[currentVertex.getKey()] = currentVertex;
  }

  return {
    distances,
    previousVertices,
  };
}
