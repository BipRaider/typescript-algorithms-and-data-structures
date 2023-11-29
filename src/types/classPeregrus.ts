//https://habr.com/ru/company/otus/blog/688270/

type MakeDate = {
  (timestamp: number): Date;
  (m: number, d: number, y: number): Date;
};

class User {
  name: string | undefined;
  age: number | undefined;

  constructor();
  constructor(name: string);
  constructor(age: number);
  constructor(name: string, age: number);
  constructor(data?: string | number, age?: number) {
    if (typeof data === 'string') {
      this.name = data;
    } else if (typeof data === 'number') {
      this.age = data;
    }
    if (typeof age === 'number') {
      this.age = age;
    }
  }

  getUser(): string | null;
  getUser(age: boolean): number | null;
  getUser(age?: boolean): string | number | null {
    if (typeof age === 'boolean' && age && this.age) {
      return this.age;
    }
    if (this.name) return this.name;
    return null;
  }

  makeDate: MakeDate = function (mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
      return new Date(y, mOrTimestamp, d);
    } else {
      return new Date(mOrTimestamp);
    }
  };
}

const user5 = new User(11);
const user6 = new User('vasy');
const user7 = new User();
const user8 = new User('asd', 11);
console.log(user8.getUser(true));
console.log(user8.getUser());
console.log(user7.getUser());

function getUser(): string | null;
function getUser(age: boolean): number | null;
function getUser(age?: boolean): string | number | null {
  if (typeof age === 'boolean' && age && this.age) {
    return this.age;
  }
  if (this.name) return this.name;
  return null;
}

const makeDate: MakeDate = (mOrTimestamp: number, d?: number, y?: number): Date => {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
};
