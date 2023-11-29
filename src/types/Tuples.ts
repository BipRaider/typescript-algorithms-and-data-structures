const Tuples: [number, string] = [123, 'something'];

const sNumber = Tuples[0];
const sString = Tuples[1];

// const sString2 = tapl[2];

const [sId, sName] = Tuples;

const Tuples_2: [number, string, ...boolean[]] = [123, 'something', true, false];

//fn
function TupleFn(params: { fromTo: [string, string] }) {
  console.dir(params);
}
//1
const TupleFnParams = {
  fromTo: ['str', 'str'],
};

TupleFn(TupleFnParams);

//2
type TupleFnType<T> = T extends (first: infer First, ...args: any[]) => any ? First : never;
const TupleFnParams2: TupleFnType<typeof TupleFn> = {
  fromTo: ['str', 'str'],
};

TupleFn(TupleFnParams2);
