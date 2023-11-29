/*
** function fillSurroundedRegions
   1. Initialize a 'visited' array of same length as the input array
      pre-filled with 'false' values
   2. Start at the boundary entries
   3. If the boundary entry is a W entry and unmarked:
         Call markBoundaryRegion function
   4. Iterate through A and change the unvisited W entry to B

** function markBoundaryRegion
   Start with a boundary W entry
   Traverse the grid using BFS
   Mark the feasible entries as true
*/

function fillSurroundedRegions(board: string | any[]) {
  if (!board.length) return;

  const numRows = board.length;
  const numCols = board[0].length;
  let visited = [];

  for (let i = 0; i < numRows; i++) {
    visited.push(new Array(numCols).fill(false, 0, numCols));
  }
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] == 'W' && !visited[i][0]) {
      markBoundaryRegion(i, 0, board, visited);
    }
    if (board[i][board.length - 1] == 'W' && !visited[i][board.length - 1]) {
      markBoundaryRegion(i, board.length - 1, board, visited);
    }
  }
  for (let j = 0; j < board[0].length; j++) {
    if (board[0][j] == 'W' && !visited[0][j]) markBoundaryRegion(0, j, board, visited);

    if (board[board.length - 1][j] == 'W' && !visited[board.length - 1][j]) {
      markBoundaryRegion(board.length - 1, j, board, visited);
    }
  }
  for (let i = 1; i < board.length - 1; i++) {
    for (let j = 1; j < board.length - 1; j++) {
      if (board[i][j] == 'W' && !visited[i][j]) {
        board[i][j] = 'B';
      }
    }
  }
  return board;
}
function markBoundaryRegion(i: number, j: number, board: string | any[], visited: any[][]) {
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const queue = [];
  queue.push([i, j]);
  visited[i][j] = true;
  let currentPosition, neighbor;
  while (queue.length) {
    currentPosition = queue.shift();
    for (const direction of directions) {
      neighbor = [i + direction[0], j + direction[1]];
      if (isFeasible3(board, visited, neighbor)) {
        visited[neighbor[0]][neighbor[1]] = true;
        queue.push(neighbor);
      }
    }
  }
}

function isFeasible3(board: string | any[], visited: any, neighbor: any[]) {
  let x = neighbor[0],
    y = neighbor[1];
  return x >= 0 && x < board.length && y >= 0 && y < board[x].length && board[x][y] == 'W';
}

const board = [
  ['B', 'B', 'B', 'B'],
  ['W', 'B', 'W', 'B'],
  ['B', 'W', 'W', 'B'],
  ['B', 'B', 'B', 'B'],
];

fillSurroundedRegions(board);
