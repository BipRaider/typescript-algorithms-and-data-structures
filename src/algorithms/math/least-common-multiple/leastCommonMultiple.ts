import euclideanAlgorithm from '../euclidean-algorithm/euclideanAlgorithm';

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export default function leastCommonMultiple(a: number, b: number): number {
  return a === 0 || b === 0 ? 0 : Math.abs(a * b) / euclideanAlgorithm(a, b);
}
