interface IUserDecoratorClass {
  users: number;
  getUsers(): number;
}

function UpDateClassBeforeStart(target: Function) {
  console.log('upDateClassBeforeStart ->');
  target.prototype.users = 0;
}

function UpDateClassAfterNew<T extends { new (...args: any[]): {} }>(constructor: T): T {
  console.log('upDateClassAfterNew ->');

  return class extends constructor {
    users = 3;
  };
}

function FabricUpDateClassBeforeStart(args: number) {
  console.log('fabricUpDateClassBeforeStart ->', args);
  return (target: Function) => {
    target.prototype.users = args;
  };
}

function FabricUpDateClassAfterNew(args: number) {
  console.log('fabricUpDateClassAfterNew ->', args);
  return <T extends { new (...args: any[]): {} }>(constructor: T): T => {
    return class extends constructor {
      users = args;
    };
  };
}

type CreateAt = {
  createAt: Date;
};

function FabricUpDateClassBeforeStartWithAddMethod(args: number) {
  console.log('FabricUpDateClassBeforeStartWithAddMethod ->', args);
  return <T extends { new (...args: any[]): {} }>(constructor: T): T => {
    return class extends constructor {
      users = args;
      createAt = new Date();
    };
  };
}

console.log('decorator-1-->');
@UpDateClassBeforeStart
@UpDateClassAfterNew
class UserDecorator implements IUserDecoratorClass {
  users: number = 1000;

  getUsers(): number {
    return this.users;
  }
}
console.log('decorator-2-->');
@FabricUpDateClassBeforeStart(44)
@FabricUpDateClassAfterNew(33)
class UserDecorator_1 implements IUserDecoratorClass {
  users: number = 1000;

  getUsers(): number {
    return this.users;
  }
}
console.log('decorator-3-->');
@FabricUpDateClassBeforeStartWithAddMethod(55)
class UserDecorator_2 implements IUserDecoratorClass {
  users: number = 1000;

  getUsers(): number {
    return this.users;
  }
}

console.log('decorator--->');
console.log(new UserDecorator().getUsers());
console.log(new UserDecorator_1().getUsers());
console.log((new UserDecorator_2() as IUserDecoratorClass & CreateAt).createAt);
