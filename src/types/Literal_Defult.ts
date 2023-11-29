// https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types

// NonNullable<Type>
// InstanceType<Type>
// ThisParameterType<Type>
// OmitThisParameter<Type>
// ThisType<Type>

interface LitDef {
  name: string;
  age?: number;
  roles: string[];
  fn: () => string;
  fn2: () => number;
}

type Partial_LitDef = Partial<LitDef>;
type Required_LitDef = Required<LitDef>;
type Readonly_LitDef = Readonly<LitDef>;
type Record_LitDef = Record<keyof LitDef, LitDef>;
type Pick_LitDef = Pick<LitDef, 'age'>;
type Omit_LitDef = Omit<LitDef, 'age'>;

type Extract_LitDef = Extract<LitDef[keyof LitDef], Function>;
const extra: Extract_LitDef = (): string => 'str';
const extra2: Extract_LitDef = (): number => 1;

type Exclude_LitDef = Exclude<LitDef[keyof LitDef], Function | undefined>;
const extra3: Exclude_LitDef = 1;
const extra4: Exclude_LitDef = 'Str';
const extra5: Exclude_LitDef = ['role-1'];

function SomParametersFn(params: Omit<LitDef, 'fn' | 'name'>, name: string) {
  return { params, name };
}

type Parameters_LitDef = Parameters<typeof SomParametersFn>;

const parametersFN: Parameters_LitDef[0] = {
  roles: [],
  fn2: (): number => 5,
};
const parametersFN1: Parameters_LitDef[1] = 'str';
SomParametersFn(parametersFN, parametersFN1);

type ConstructorParameters_LitDef = ConstructorParameters<typeof Error>;
const c_libDef: ConstructorParameters_LitDef[0] = 'error string';
const c_libDef1: Required<ConstructorParameters_LitDef[1]> = { cause: 'unknown' };

type ReturnType_LitDef = ReturnType<typeof SomParametersFn>;
const returnType: ReturnType_LitDef = {
  params: {
    age: 1,
    roles: ['s'],
    fn2: (): number => 5,
  },
  name: 'str',
};

type Awaited_LitDef = Awaited<Promise<ReturnType_LitDef>>;
type Awaited_LitDef2 = Awaited<Promise<Parameters_LitDef>>;
