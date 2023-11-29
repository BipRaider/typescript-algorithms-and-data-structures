function flipColor(image: number[][], x: number, y: number) {
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let color = image[x][y];

  let queue = [];

  image[x][y] = Number(!color);

  queue.push([x, y]);

  let currentPosition: any[] | undefined;

  let neighbor;

  while (queue.length) {
    currentPosition = queue.shift();

    if (!currentPosition) continue;

    for (const direction of directions) {
      neighbor = [currentPosition[0] + direction[0], currentPosition[1] + direction[1]];
      if (isFeasible2(image, neighbor, color)) {
        image[neighbor[0]][neighbor[1]] = Number(!color);
        queue.push([neighbor[0], neighbor[1]]);
      }
    }
  }
  return image;
}

function isFeasible2(image: string | any[], indices: any[], color: any) {
  let x = indices[0];
  let y = indices[1];

  const state = [x >= 0, x < image.length, y >= 0, y < image[x].length, image[x][y] == color].every(
    value => value === true,
  );

  return state;
}

const image = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
];

flipColor(image, 1, 1);
