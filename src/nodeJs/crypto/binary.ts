//https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Expressions_and_operators
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators

// ** - Increments the first value to the degree of the second value (2*2*2*2*2)
// ^ - Returns a one at each bit position for which only one of the corresponding operand bits is a one. (1111 ^ 1001 = 0110)
// & & - Returns a one in each bit position for which the corresponding bits of both operands are one. (1111 & 1001 = 1001)
// | - Returns a one in each bit position for which one or both of the corresponding bits of the operands are one. (1111 | 1001 = 1111)
// ~ - Replaces the operand bits with opposite bits.  (~``00000000...``00001111 = ``1111``1111``...``11110000)
// >> - Shifts (a) in binary representation by (b) bits to the right, discarding the bits being shifted.
// << - Shifts (a) in binary representation by (b) bits to the left, adding zeros to the right.
// >>>> - Shifts (a) in binary representation by (b) bits to the right, discarding the bits to be shifted and adding zeros to the left.
// <<< - Shifts (a) in binary representation by (b) bits to the left, discarding shifted bits and adding zeros to the right.

console.dir(((2 ^ 66) - 1) << 10); //64512
console.dir((Math.pow(2, 6) - 1) << 10); //64512
console.dir((2 ** 6 - 1) << 10); //64512
//
console.dir(((2 ^ 66) - 1) << 4);
console.dir((Math.pow(2, 6) - 1) << 4);
//
console.dir((2 ^ 18) - 1);
console.dir(Math.pow(2, 4) - 1);
///
console.dir(122 & 63);
console.dir(122 - 63 - 1);
//

// for (let i = 0; i < 1111; i++) {
//   if (5 >>> i) console.dir(i);
// }

console.dir(5 >>> 32);

// alg      | random value        |  1    | 0x7fffffff    | 0x3fffffff
// bit1     | 25.06               | 255.93| 17.59         | 23.10
// bit2     | 40.51               |  39.27| 39.90         | 38.91
// bit3     | 40.15               |  26.64| 40.94         | 39.41
// ---------
//
const bit1 = x => {
  let t = 1 << 30;
  while (x < t) t >>= 1;
  return t;
};

const bit2 = x => {
  x |= x >> 1;
  x |= x >> 2;
  x |= x >> 4;
  x |= x >> 8;
  x |= x >> 16;
  return x - (x >> 1);
};

const bit3 = x => {
  let t = 1;
  if (x >= t << 16) t <<= 16;
  if (x >= t << 8) t <<= 8;
  if (x >= t << 4) t <<= 4;
  if (x >= t << 2) t <<= 2;
  if (x >= t << 1) t <<= 1;
  return t;
};

console.dir(bit2(6));
console.dir(bit3(6));
