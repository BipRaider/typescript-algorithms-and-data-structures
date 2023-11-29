/** getting only two values `success` or `failed`.
 * ```ts
 * const suc: Conditional<'success'> = {...}
 * or
 * const err: Conditional<'failed'> = {...}
 * ```
 *
 */
interface Conditional<T extends 'success' | 'failed'> {
  code: number;
  data: T extends 'success' ? string : Error;
}

const suc: Conditional<'success'> = {
  code: 200,
  data: 'OK',
};

const err: Conditional<'failed'> = {
  code: 404,
  data: new Error('error'),
};
