// https://habr.com/ru/companies/timeweb/articles/682748/

export interface Dictionary<V = any> {
  [key: string]: V;
}

export interface Duplicator<Element> {
  Element: Element;
}

export type ValuesOf<T> = T[keyof T];

export type DeepPartial<T> = T extends object ? { [P in keyof T]: DeepPartial<T[P]> } : T;
/**
 ```ts
 TupleFnType<typeof TupleFn>
 ```
 */
export type FirstFnType<T> = T extends (first: infer First, ...args: any[]) => any ? First : never;

export type AnyFunction<T = any> = (...input: any[]) => T;
export type AnyConstructor<T = object> = new (...input: any[]) => T;
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;

//
enum NameControllers {
  User = 'user',
  Admin = 'admin',
}

export type ClassTypeModifier<Name extends NameControllers, Types> = {
  [key in keyof Types as `${Lowercase<Name>}${Capitalize<string & key>}`]-?: Types[key];
};

/*** TypesScript
 * ```ts
 * Number
 * BigInt
 * String
 * Boolean
 * Object
 * Symbol
 * Array
 * Tuples
 * Enum
 * void
 * never
 * any
 * unknown
 * undefine
 * null
 * ```
 */
const types: string = 'types';

type MappedTypeWithNewKeys<T> = {
  [K in keyof T]: T[K];
};


export const ConstantLanguage = {
	UK: "uk",
	RU: "ru",
	EN: "en",
} as const;
export type TypeLanguage = typeof ConstantLanguage;
export type ValueLanguage =
	(typeof ConstantLanguage)[keyof typeof ConstantLanguage];
export type TypeLanguageKey<T> = {
	[key in ValueLanguage]: T;
};
