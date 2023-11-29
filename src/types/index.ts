// https://www.typescriptlang.org/docs/handbook/utility-types.html

interface TypeFnFotGetParams {
  id: string;
  name: string;
  age: number;
}

const typeFnFotGetParams = (t: TypeFnFotGetParams, check: boolean): TypeFnFotGetParams => {
  console.info(check);
  return t;
};

type FnReturn = ReturnType<typeof typeFnFotGetParams>;

type FnArgs = Parameters<typeof typeFnFotGetParams>;

//-------------
