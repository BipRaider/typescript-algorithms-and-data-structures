import Graph from '../../../data-structures/graph/Graph';
import GraphEdge from '../../../data-structures/graph/GraphEdge';
import graphBridges from '../bridges/graphBridges';

/**
 * Fleury's algorithm of finding Eulerian Path (visit all graph edges exactly once).
 *
 * @param {Graph} graph
 * @return {GraphVertex[]}
 */
export default function eulerianPath(graph: Graph) {
  const eulerianPathVertices: GraphVertex[] = [];
  // Set that contains all vertices with even rank (number of neighbors).
  const evenRankVertices: Record<string, any> = {};
  // Set that contains all vertices with odd rank (number of neighbors).
  const oddRankVertices: Record<string, any> = {};
  // Set of all not visited edges.
  const notVisitedEdges: Record<string, any> = {};

  graph.getAllEdges().forEach((vertex: { getKey: () => string | number }) => {
    notVisitedEdges[vertex.getKey()] = vertex;
  });

  // Detect whether graph contains Eulerian Circuit or Eulerian Path or none of them.
  /** @params {GraphVertex} vertex */
  graph.getAllVertices().forEach((vertex: { getDegree: () => number; getKey: () => string | number }) => {
    if (vertex.getDegree() % 2) {
      oddRankVertices[vertex.getKey()] = vertex;
    } else {
      evenRankVertices[vertex.getKey()] = vertex;
    }
  });

  // Check whether we're dealing with Eulerian Circuit or Eulerian Path only.
  // Graph would be an Eulerian Circuit in case if all its vertices has even degree.
  // If not all vertices have even degree then graph must contain only two odd-degree
  // vertices in order to have Euler Path.
  const isCircuit = !Object.values(oddRankVertices).length;

  if (!isCircuit && Object.values(oddRankVertices).length !== 2) {
    throw new Error('Eulerian path must contain two odd-ranked vertices');
  }

  // Pick start vertex for traversal.
  let startVertex = null;

  if (isCircuit) {
    // For Eulerian Circuit it doesn't matter from what vertex to start thus we'll just
    // peek a first node.
    const evenVertexKey = Object.keys(evenRankVertices)[0];
    startVertex = evenRankVertices[evenVertexKey];
  } else {
    // For Eulerian Path we need to start from one of two odd-degree vertices.
    const oddVertexKey = Object.keys(oddRankVertices)[0];
    startVertex = oddRankVertices[oddVertexKey];
  }

  // Start traversing the graph.
  let currentVertex = startVertex;
  while (Object.values(notVisitedEdges).length) {
    // Add current vertex to Eulerian path.
    eulerianPathVertices.push(currentVertex);

    // Detect all bridges in graph.
    // We need to do it in order to not delete bridges if there are other edges
    // exists for deletion.
    const bridges: Record<string, any> = graphBridges(graph);

    // Peek the next edge to delete from graph.
    const currentEdges = currentVertex.getEdges();
    /** @var {GraphEdge} edgeToDelete */
    let edgeToDelete: GraphEdge | null = null;
    if (currentEdges.length === 1) {
      // If there is only one edge left we need to peek it.
      [edgeToDelete] = currentEdges;
    } else {
      // If there are many edges left then we need to peek any of those except bridges.
      [edgeToDelete] = currentEdges.filter((edge: { getKey: () => string | number }) => !bridges[edge.getKey()]);
    }

    // Detect next current vertex.
    if (currentVertex.getKey() === edgeToDelete?.startVertex?.getKey()) {
      currentVertex = edgeToDelete?.endVertex;
    } else {
      currentVertex = edgeToDelete?.startVertex;
    }

    // Delete edge from not visited edges set.
    delete notVisitedEdges[edgeToDelete!.getKey()];

    // If last edge were deleted then add finish vertex to Eulerian Path.
    if (Object.values(notVisitedEdges).length === 0) {
      eulerianPathVertices.push(currentVertex);
    }

    // Delete the edge from graph.
    if (edgeToDelete instanceof GraphEdge) graph.deleteEdge(edgeToDelete);
  }

  return eulerianPathVertices;
}
