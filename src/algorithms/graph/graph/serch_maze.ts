/***function hasPath
   Start at the entry point
   While exit point has not been reached
     1. Move to the top cell
     2. Check if position is feasible (white cell & within boundary)
     3. Mark cell as visited (turn it into a black cell)
     4. Repeat steps 1-3 for the other 3 directions
*/
const hasPath = function (maze: Record<string | number, any>, start: (string | number)[], destination: number[]) {
  maze[start[0]][start[1]] = 1;
  return searchMazeHelper(maze, start, destination);
};

function searchMazeHelper(maze: Record<string | number, any>, current: any[], end: any[]) {
  // dfs
  if (current[0] == end[0] && current[1] == end[1]) return true;

  let neighborIndices;
  // Indices: 0->top,1->right, 2->bottom, 3->left
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  for (const direction of directions) {
    neighborIndices = [current[0] + direction[0], current[1] + direction[1]];
    if (isFeasible(maze, neighborIndices)) {
      maze[neighborIndices[0]][neighborIndices[1]] = 1;
      if (searchMazeHelper(maze, neighborIndices, end)) return true;
    }
  }
  return false;
}

function isFeasible(maze: Record<string | number, any>, indices: any[]) {
  let x = indices[0],
    y = indices[1];
  return x >= 0 && x < maze.length && y >= 0 && y < maze[x].length && maze[x][y] === 0;
}

const maze = [
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0],
];
hasPath(maze, [0, 4], [3, 2]);
