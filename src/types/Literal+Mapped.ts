type BaseController = {
  crate: () => void;
  get: () => never;
  find: () => string;
};

type UserController<T extends BaseController> = {
  [key in keyof T as `user${Capitalize<string & key>}`]: T[key];
};

const userController: UserController<BaseController> = {
  userCrate: function (): void {
    throw new Error('Function not implemented.');
  },
  userGet: function (): never {
    throw new Error('Function not implemented.');
  },
  userFind: function (): string {
    throw new Error('Function not implemented.');
  },
};

type BaseController2 = {
  find: () => number;
  findAll: () => string;
};

type BaseController3 = {
  crate?: () => void;
  get?: () => never;
};

type UserController2<T> = {
  [key in keyof T as `user${Capitalize<string & key>}`]-?: T[key];
};

const userController2: UserController2<BaseController2 & BaseController3> = {
  userFind: function (): number {
    throw new Error('Function not implemented.');
  },
  userFindAll: function (): string {
    throw new Error('Function not implemented.');
  },
  userCrate: function (): void {
    throw new Error('Function not implemented.');
  },
  userGet: function (): never {
    throw new Error('Function not implemented.');
  },
};

type ControllerType<Name extends string, Types> = {
  [key in keyof Types as `${Lowercase<Name>}${Capitalize<string & key>}`]-?: Types[key];
};

const userController3: ControllerType<'USER', BaseController2 & BaseController3 & { name: string }> = {
  userFind: function (): number {
    throw new Error('Function not implemented.');
  },
  userFindAll: function (): string {
    throw new Error('Function not implemented.');
  },
  userCrate: function (): void {
    throw new Error('Function not implemented.');
  },
  userGet: function (): never {
    throw new Error('Function not implemented.');
  },
  userName: 'user',
};

enum NameControllers {
  User = 'user',
  Admin = 'admin',
}

type ControllerType2<Name extends NameControllers, Types> = {
  [key in keyof Types as `${Lowercase<Name>}${Capitalize<string & key>}`]-?: Types[key];
};

const userController4: ControllerType2<NameControllers.Admin, BaseController2> = {
  adminFind: function (): number {
    throw new Error('Function not implemented.');
  },
  adminFindAll: function (): string {
    throw new Error('Function not implemented.');
  },
};

const userController5: ControllerType2<NameControllers.User, BaseController2> = {
  userFind: function (): number {
    throw new Error('Function not implemented.');
  },
  userFindAll: function (): string {
    throw new Error('Function not implemented.');
  },
};

const userController6: ControllerType2<NameControllers, BaseController2 & { name: string }> = {
  userFind: function (): number {
    throw new Error('Function not implemented.');
  },
  adminFind: function (): number {
    throw new Error('Function not implemented.');
  },
  userFindAll: function (): string {
    throw new Error('Function not implemented.');
  },
  adminFindAll: function (): string {
    throw new Error('Function not implemented.');
  },
  userName: '',
  adminName: '',
};
