//keyof
interface IKeyOfUser {
  name: string;
  age: number;
  roles: Role[];
}
type TKeyOfUser = keyof IKeyOfUser;

const keyUser: TKeyOfUser = 'name';
const keyUser1: TKeyOfUser = 'age';

function KeyOfUser(obj: IKeyOfUser, key: TKeyOfUser) {
  return obj[key];
}

function KeyOfUser2<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const userKeyOf: IKeyOfUser = {
  name: 'user',
  age: 10,
  roles: [{ name: '2' }],
};

KeyOfUser(userKeyOf, 'name');
KeyOfUser2(userKeyOf, 'name');

//typeof
const userTypeOf: typeof userKeyOf = {
  name: 'user',
  age: 10,
  roles: [{ name: 's' }],
};
type TTypeOfUser = keyof typeof userKeyOf;
type TTypeOfUser1 = IKeyOfUser[TTypeOfUser];
type TTypeOfUser6 = (typeof userTypeOf)[keyof typeof userTypeOf];

enum DreTypeOF {
  up,
  down,
}
type TTypeOfUser2 = keyof typeof DreTypeOF;

const nameUserTypeof = 'name';
const roleUserTypeof = 'roles';
type TTypeOfUser3 = IKeyOfUser[typeof nameUserTypeof];
type TTypeOfUser4 = IKeyOfUser[typeof roleUserTypeof][number];
type TTypeOfUser5 = IKeyOfUser[typeof roleUserTypeof][number]['name'];
