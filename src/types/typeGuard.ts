export const isString = (params: unknown): params is string => typeof params === 'string';
export const isNumber = (params: unknown): params is number => typeof params === 'number';

interface User {
  name: string;
  role: 'user';
}

interface Admin {
  name: string;
  role: 'admin';
}

const user = {};

export const isAdmin = (user: User | Admin): user is Admin => {
  return 'role' in user && user.role === 'admin';
};

export const isAdmin2 = (user: User | Admin): user is Admin => {
  return (user as Admin).role === 'admin';
};

export function checkUser(user: User | Admin) {
  if (isAdmin(user)) return user.role;
  return user.role;
}

export function checkUserOk(obj: unknown): asserts obj is User {
  if (typeof obj === 'object' && !!obj && 'name' in obj) return;
  throw new Error('Not user');
}

checkUserOk(user);
user.name;

// interface Admin2 {
//   name: string;
//   role: 'admin2';
// }

type People = User | Admin;

export function checkTypeEnumInSwitch(check: never): never {
  console.info(check);
  return check;
}

function CheckPeople(people: People) {
  switch (people.role) {
    case 'admin':
      console.info(people);
      break;
    case 'user':
      console.info(people);
      break;

    default:
      checkTypeEnumInSwitch(people);
      break;
  }
}
//
type CheckConditionalType<T> = T extends string ? string : number;
