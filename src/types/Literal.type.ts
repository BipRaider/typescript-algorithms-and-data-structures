const LitNum = 1;
let LitNum1: 1 = 1;

const LitStr = 'str';
let LitStr1: 'str' = 'str';

type ReadOrWrite = 'read' | 'write';
type ReadOrWrite_1 = 'READ' | 'WRITE';

//Literal type

type Literal_type = `access_${ReadOrWrite}`;
type Literal_type_1 = `access_${Uppercase<ReadOrWrite>}`;
type Literal_type_2 = `access_${Lowercase<ReadOrWrite_1>}`;
type Literal_type_3 = `access_${Capitalize<ReadOrWrite>}`;
type Literal_type_4 = `access_${Uncapitalize<ReadOrWrite_1>}`;

type Literal_type_5 = `access_${Capitalize<ReadOrWrite_1>}_${Capitalize<ReadOrWrite>}`;

type ReversLiteralType<T> = T extends `access_${infer R}` ? R : never;

type ReversLiteral = ReversLiteralType<Literal_type_5>;
type ReversLiteral_1 = ReversLiteralType<Literal_type>; // === ReadOrWrite

type Literal_1<T> = {
  [key in keyof T as `access_${string & key}`]: T[key];
};
