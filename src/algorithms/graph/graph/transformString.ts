// Transform one string to another
// Time Complexity: O(M x M x N)

/*** function transformString
    1. Build graph using compareStrings function. Add edges if and only if  the two strings differ by 1 character
    2. Run BFS and increment length
    3. Return length of production sequence
*/
function transformString(beginWord: string | number, endWord: any, wordList: any) {
  let graph = buildGraph(wordList, beginWord);
  if (!graph.has(endWord)) return 0;
  let queue = [beginWord];
  let visited: Record<string | number, any> = {};
  visited[beginWord] = true;
  let count = 1;
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let currentWord = queue.shift();
      if (currentWord === endWord) {
        return count;
      }
      graph.get(currentWord).forEach((neighbor: string | number) => {
        if (!visited[neighbor]) {
          queue.push(neighbor);
          visited[neighbor] = true;
        }
      });
    }
    count++;
  }
  return 0;
}
/*** function compareStrings
   Compare two strings char by char
   Return how many chars differ
*/
function compareStrings(str1: string | any[], str2: any[]) {
  let diff = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) diff++;
  }
  return diff;
}

function buildGraph(wordList: any[], beginWord: any) {
  let graph = new Map();

  wordList.forEach((word: any) => {
    graph.set(word, []);
    wordList.forEach((nextWord: any) => {
      if (compareStrings(word, nextWord) == 1) {
        graph.get(word).push(nextWord);
      }
    });
  });

  if (!graph.has(beginWord)) {
    graph.set(beginWord, []);
    wordList.forEach((nextWord: any) => {
      if (compareStrings(beginWord, nextWord) == 1) {
        graph.get(beginWord).push(nextWord);
      }
    });
  }
  return graph;
}
