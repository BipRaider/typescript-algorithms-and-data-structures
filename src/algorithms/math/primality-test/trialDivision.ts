/**
 * @param {number} number
 * @return {boolean}
 */
export default function trialDivision(number: number): boolean {
  // Check if number is integer.
  if (number % 1 !== 0) return false;
  // If number is less than one then it isn't prime by definition.
  if (number <= 1) return false;
  // All numbers from 2 to 3 are prime.
  if (number <= 3) return true;
  // If the number is not divided by 2 then we may eliminate all further even dividers.
  if (number % 2 === 0) return false;
  // If there is no dividers up to square root of n then there is no higher dividers as well.
  const dividerLimit = Math.sqrt(number);
  for (let divider = 3; divider <= dividerLimit; divider += 2) {
    if (number % divider === 0) return false;
  }
  return true;
}
