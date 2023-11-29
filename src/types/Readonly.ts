export type TuplesReadonly = readonly [number, string];
export const Tuples_readonly: readonly [number, string] = [123, 'something'];
export const Tuples_readonly_const = ['admin', 'user', 'super-admin'] as const;

// Tuples_readonly[0] = 1;
// Tuples_readonly_const[4]

export type ArrStringReadonly = readonly string[];
export type ArrayReadonlyString = ReadonlyArray<string>;
export const arr_readonly: readonly string[] = ['123', 'something'];

// arr_readonly[0] = 1;
// arr_readonly.push("some")

export const mapReadonly: ReadonlyMap<string, string> = new Map();
