// Making Wired Connections
// Time Complexity: O(V+E)
/*** function isBipartite
    1. Initialize an array to store uncolored vertices
    2. Iterate through all vertices one by one
    3. Assign one color (0) to the source vertex
    4. Use DFS to reach the adjacent vertices
    5. Assign the neighbors a different color (1 - current color)
    6. Repeat steps 3 to 5 as long as it satisfies the two-colored     constraint
    7. If a neighbor has the same color as the current vertex, break the loop and return false
*/

function isBipartite(graph: number[][]) {
  let color = [];

  for (let i = 0; i < graph.length; i++) color[i] = -1;

  for (let i = 0; i < graph.length; i++) {
    if (color[i] == -1) {
      let stack: number[] = [];
      stack.push(i);
      color[i] = 0;

      let node: number | undefined;

      while (stack.length) {
        node = stack.pop();

        if (node) {
          for (const neighbor of graph[node]) {
            if (color[neighbor] == -1) {
              stack.push(neighbor);
              color[neighbor] = 1 - color[node];
            } else if (color[neighbor] == color[node]) return false;
          }
        }
      }
    }
  }
  return true;
}
isBipartite([
  [],
  [2, 4, 6],
  [1, 4, 8, 9],
  [7, 8],
  [1, 2, 8, 9],
  [6, 9],
  [1, 5, 7, 8, 9],
  [3, 6, 9],
  [2, 3, 4, 6, 9],
  [2, 4, 5, 6, 7, 8],
]);
