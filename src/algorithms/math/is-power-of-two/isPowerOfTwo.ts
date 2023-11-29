/**
 * @param {number} number
 * @return {boolean}
 */
export default function isPowerOfTwo(number: number): boolean {
  // 1 (2^0) is the smallest power of two.
  if (number < 1) return false;
  // Let's find out if we can divide the number by two
  // many times without remainder.
  let dividedNumber = number;
  while (dividedNumber !== 1) {
    // For every case when remainder isn't zero we can say that this number
    // couldn't be a result of power of two.
    if (dividedNumber % 2 !== 0) return false;
    dividedNumber /= 2;
  }

  return true;
}
