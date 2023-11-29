interface IUserSortGrup<T> {
  [key: string]: T[];
}

interface IUserSort {
  name: string;
  age: number;
}

type key = number | string | symbol;

const randomNumber = (): number => Math.round(Math.random() * (10 - 1) + 1);
const randomKey = (): keyof IUserSort => (randomNumber() > 5 ? 'name' : 'age');

function sortUser<T extends Record<key, any>>(array: T[], key: keyof T): IUserSortGrup<T> {
  return array.reduce<IUserSortGrup<T>>((map: IUserSortGrup<T>, user): IUserSortGrup<T> => {
    const userKey = user[key];
    let curUser = map[userKey];
    Array.isArray(curUser) ? curUser.push(user) : (curUser = [user]);
    map[userKey] = curUser;
    return map;
  }, {});
}

const users = (): IUserSort[] => [
  { name: 'V1', age: randomNumber() },
  { name: 'V1', age: randomNumber() },
  { name: 'V2', age: randomNumber() },
  { name: 'V3', age: randomNumber() },
  { name: 'V2', age: randomNumber() },
  { name: 'V3', age: randomNumber() },
  { name: 'V1', age: randomNumber() },
  { name: 'V3', age: randomNumber() },
  { name: 'V3', age: randomNumber() },
  { name: 'V2', age: randomNumber() },
  { name: 'V2', age: randomNumber() },
  { name: 'V1', age: randomNumber() },
];

setInterval(() => {
  const usersSorted = sortUser<IUserSort>(users(), randomKey());

  console.log(usersSorted);
  console.log('next ------>');
}, 5000);
