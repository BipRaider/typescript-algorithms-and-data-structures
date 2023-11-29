export class Graph {
  adjacencyList: Record<string, any[]>;

  constructor() {
    this.adjacencyList = {};
  }

  addVertex = (vertex: string | number) => {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  };

  addEdge = (source: string | number, destination: string | number) => {
    if (!this.adjacencyList[source]) this.addVertex(source);

    if (!this.adjacencyList[destination]) this.addVertex(destination);

    this.adjacencyList[source].push(destination);
    this.adjacencyList[destination].push(source);
  };

  removeEdge = (source: string | number, destination: string | number) => {
    this.adjacencyList[source] = this.adjacencyList[source].filter(vertex => vertex !== destination);
    this.adjacencyList[destination] = this.adjacencyList[destination].filter(vertex => vertex !== source);
  };

  removeVertex = (vertex: string | number) => {
    while (this.adjacencyList[vertex]) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }

    delete this.adjacencyList[vertex];
  };
  /*** function breadthFirstSearch (Breadth First Search)
   ** The time complexity is O(V+E)
   Initialize an empty queue, empty 'result' array & a 'visited' map
   Add the starting vertex to the queue & visited map
   While Queue is not empty:
   - Dequeue and store current vertex
   - Push current vertex to result array
   - Iterate through current vertex's adjacency list:
   - For each adjacent vertex, if vertex is unvisited:
   - Add vertex to visited map
   - Enqueue vertex
   Return result array */
  breadthFirstSearch = (root: any) => {
    // Empty array to store node values
    const result = [];
    // Define queue
    const queue = [root];
    // Create while loop
    while (queue.length > 0) {
      // we need to remove the first node in the queue and set it to the variable current.
      const current = queue.shift();
      // If the node is null, we know we've reached the end of a branch
      if (current === null) continue;
      // Push node value to final array
      result.push(current.value);
      // Add child nodes to queue
      for (const child of current.children) {
        queue.push(child);
      }
    }
    // Return final array
    return result;
  };

  // Depth First Search

  /*** function depthFirstSearch
   ** The time complexity is O(V+E)

  ** Initialize an empty stack, empty 'result' array & a 'visited' map
  ** Add the starting vertex to the stack & visited map
  ** While Stack is not empty:
     - Pop and store current vertex
     - Push current vertex to result array
     - Iterate through current vertex's adjacency list:
       * - For each adjacent vertex, if vertex is unvisited:
          - Add vertex to visited map
          - Push vertex to stack
   Return result array
   */
  depthFirstSearch = (start: string) => {
    const queue: string[] = [start];
    const result = [];
    const visited: Record<string, any> = {};
    visited[start] = true;
    let currentVertex;

    while (queue.length) {
      currentVertex = queue.shift();

      result.push(currentVertex);

      if (currentVertex)
        this.adjacencyList[currentVertex].forEach(neighbor => {
          if (!visited[neighbor]) {
            visited[neighbor] = true;

            queue.push(neighbor);
          }
        });
    }
    return result;
  };

  depthFirstSearchRecursive = (start: any) => {
    const result = [];
    const visited: Record<string, any> = {};
    const adjacencyList = this.adjacencyList;

    (function depthFirstSearch(vertex: string) {
      if (!vertex) return null;

      visited[vertex] = true;

      result.push(vertex);

      adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) return depthFirstSearch(neighbor);
      });
    })(start);

    return result;
  };

  depthFirstSearchIterative = (start: string | number) => {
    const stack = [start];
    const result = [];
    const visited: Record<string, any> = {};
    visited[start] = true;
    let currentVertex;

    while (stack.length) {
      currentVertex = stack.pop();
      result.push(currentVertex);

      if (currentVertex)
        this.adjacencyList[currentVertex].forEach(neighbor => {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            stack.push(neighbor);
          }
        });
    }
    return result;
  };
  // Search Maze
}
