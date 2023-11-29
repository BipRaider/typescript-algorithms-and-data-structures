// Record<Keys, Type> https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type

type Modifier = 'reed' | 'update' | 'create';

type ModifierUserRole = {
  customers: Modifier;
  projects?: Modifier;
  adminPanel: Modifier;
};

type ModifierToAccess<T> = {
  [key in keyof T]: boolean;
};
type ModifierToAccess1 = ModifierToAccess<ModifierUserRole>;

/*
 ** Literal type.
 */
type ModifierToAccess_1<T> = {
  [key in keyof T as `access_${string & key}`]: boolean;
};
type ModifierToAccess2 = ModifierToAccess_1<ModifierUserRole>;

/***  `-?` or `+?` */
type ModifierToAccess_2<T> = {
  [key in keyof T as `access_${string & key}`]-?: boolean;
};
type ModifierToAccess3 = ModifierToAccess_2<ModifierUserRole>;

/*** `-readonly` or `+readonly` */
type ModifierToAccess_3<T> = {
  -readonly [key in keyof T as `access_${string & key}`]+?: boolean;
};
type ModifierToAccess4 = ModifierToAccess_3<ModifierUserRole>;

/***   `Exclude<type,[...what]>`*/
type ModifierToAccess_4<T> = {
  +readonly [key in keyof T as Exclude<`access_${string & key}`, 'access_adminPanel'>]-?: boolean;
};
type ModifierToAccess5 = ModifierToAccess_4<ModifierUserRole>;

type ModifierToAccess_5<T> = {
  -readonly [key in keyof T as `access_${string & key}`]-?: boolean;
};
type ModifierToAccess6 = ModifierToAccess_5<ModifierUserRole>;
//

const MappedParams: ModifierUserRole = {
  customers: 'reed',
  adminPanel: 'update',
};

type ModifierToAccess_6<T> = {
  [key in keyof T]:
    | { isValid: true }
    | {
        isValid: false;
        errorMessage: 'is not valid';
      };
};

const MappedParamsForm: ModifierToAccess_6<ModifierUserRole> = {
  customers: {
    isValid: false,
    errorMessage: 'is not valid',
  },
  adminPanel: {
    isValid: false,
    errorMessage: 'is not valid',
  },
};
