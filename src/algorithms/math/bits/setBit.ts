/**
 * @param {number} number
 * @param {number} bitPosition - zero based.
 * @return {number}
 */
export default function setBit(number: number, bitPosition: number): number {
  return number | (1 << bitPosition);
}
