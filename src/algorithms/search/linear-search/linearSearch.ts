import Comparator from '../../../utils/comparator/Comparator';

/**
 * Linear search implementation.
 *
 * @param {*[]} array
 * @param {*} seekElement
 * @param {function(a, b)} [comparatorCallback]
 * @return {number[]}
 */
export default function linearSearch(
  array: any[],
  seekElement: any,
  comparatorCallback?: (arg0: any, arg1: any) => any,
): number[] {
  const comparator = new Comparator(comparatorCallback);
  const foundIndices: number[] = [];

  array.forEach((element, index) => {
    if (comparator.equal(element, seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
}
