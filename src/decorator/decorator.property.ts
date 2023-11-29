import 'reflect-metadata';
interface IUserDecoratorParams {
  age: number;
}

export const Max = (max: number) => {
  console.log('\x1b[34m%s\x1b[0m', 'Max :', this);
  return (target: Object, propertyKey: PropertyKey): any => {
    console.log('\x1b[34m%s\x1b[0m', 'Max_1 :', this);
    console.log('\x1b[34m%s\x1b[0m', 'Max_2 :', target);
    console.log('\x1b[34m%s\x1b[0m', 'Max_3 :', propertyKey);
    let value: any;
    const getter = function () {
      console.log('\x1b[32m%s\x1b[0m', 'getter :', this);
      return value;
    };

    const setter = function (n: number) {
      if (n > max) {
        console.log('\x1b[35m%s\x1b[0m', 'Long');
        return;
      }
      value = n;
      console.log('\x1b[32m%s\x1b[0m', 'setter:', value);
    };
    Object.defineProperties(target, {
      [`${propertyKey.toString()}Max`]: {
        set: setter,
        get: getter,
      },
    });
  };
};

const getAge = function (min: number) {
  console.log('\x1b[32m%s\x1b[0m', 'getAge :', this);
  return function (target: Object, propertyKey: string) {
    try {
      console.log('\x1b[32m%s\x1b[0m', 'getAge_1 :', this);
      console.log('\x1b[32m%s\x1b[0m', 'getAge_2 :', target);
      console.log('\x1b[32m%s\x1b[0m', 'getAge_3 :', propertyKey);
      console.log('\x1b[32m%s\x1b[0m', 'getAge_4 :', this[propertyKey]);
    } catch (error) {
      if (error instanceof Error) {
        console.log('\x1b[31m%s\x1b[0m', 'getAge_4 :', error.message);
      }
    }
    let value: any;
    const get = function () {
      console.log('\x1b[32m%s\x1b[0m', 'getter_+ :', this);
      return value;
    };
    const set = function (n: number) {
      if (n < min) {
        console.log('\x1b[35m%s\x1b[0m', 'Short');
        return;
      }
      value = n;
      console.log('\x1b[32m%s\x1b[0m', 'setter_+:', value);
    };

    Object.defineProperty(target, propertyKey, { set, get });
    // Object.defineProperties(target, { [propertyKey]: { set, get } });
  };
};

class UserDecoratorParams implements IUserDecoratorParams {
  @getAge(11)
  @Max(13)
  age: number;

  name: string;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const userParams = new UserDecoratorParams('sss', 22);

userParams.age = 1;
console.log('\x1b[31m%s\x1b[0m', '1--->', userParams.age);
userParams.age = 13;
console.log('\x1b[31m%s\x1b[0m', '2--->', userParams.age);
console.log('\x1b[31m%s\x1b[0m', '3--->', userParams);
