function computeEnum(): number {
  return 3;
}

enum EnumData {
  FN = computeEnum(),
  First = 'some',
  Second = 1,
  Third,
  Fourth = 4,
  Fifth = Fourth + Second,
  SomeText = 'text',
}

const enum EnumDataConst {
  First = 'some',
  Second = 1,
  Third,
  Fourth = 4,
  Fifth = Fourth + Second,
  SomeText = 'text',
}

const EnumDataObject = {
  First: 'First',
  Second: 'Second',
  Third: 'Third',
  Fourth: 'Fourth',
} as const;

// type ValuesOf<T> = T[keyof T];
// type EnumDataObject = ValuesOf<typeof EnumDataObject>;
type EnumDataObject = (typeof EnumDataObject)[keyof typeof EnumDataObject];

console.log(EnumData.First); // return `some`
console.log(EnumData.Second); // return `1`
console.log(EnumData.Third); // return `2`
console.log(EnumData.Fourth); // return `4`

const keyEnum = Object.keys(EnumData);
const valuesEnum = Object.values(EnumData);
const entriesEnum = Object.entries(EnumData);

console.log('keyEnum', keyEnum); // [('1', '2', '4', 'First', 'Second', 'Third', 'Fourth')]
console.log('valuesEnum', valuesEnum); // [('Second', 'Third', 'Fourth', 'some', 1, 2, 4)]
console.log('entriesEnum', entriesEnum); // ['1', 'Second'], ['2', 'Third'], ['4', 'Fourth'], ['First', 'some'], ['Second', 1], ['Third', 2], ['Fourth', 4]

function EnumFn(params: EnumData) {
  console.dir(params);
}

EnumFn(1); // ok
EnumFn(2); // ok
// EnumFn(3); // error
EnumFn(4); // ok
EnumFn(5); // ok
// EnumFn("some"); // error
EnumFn(EnumData.First); // ok

function EnumFnObject(data: { Second: number; FN: number; Fourth: 4; First: 'some'; SomeText: string }): void {
  console.dir(data);
}

EnumFnObject(EnumData);

export const ConstantInterval = {
  ONE: 'ONE',
  THIRTY: 'THIRTY',
  SIXTY: 'SIXTY',
} as const;

export type TypeInterval = typeof ConstantInterval;
export type ValueInterval = (typeof ConstantInterval)[keyof typeof ConstantInterval];
