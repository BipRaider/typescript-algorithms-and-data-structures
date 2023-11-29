import { ValuesOf } from './types';

interface User33 {
  name: string;
  age: number;
  email: string;
}

interface Admin {
  role: string;
  name: string;
}

type TGuard<T, R> = (data: T) => R;

const isAdmin: TGuard<User33, Admin> = ({ name, age }) => ({ role: 'sss', name, age });
// error
//const isAdmin_3 = <T extends User>({name,age }:T):Admin => ({role:"sss",name,age })

type TGuard_1 = (d: User33) => Admin;

const isAdmin_1: TGuard_1 = ({ name, age }) => ({ role: 'sss', name, age });
// error
//const isAdmin_2 = ({name,age }:User):Admin => ({role:"sss",name,age })
interface IUser {
  isAdmin: TGuard_1;
}

class iUser implements IUser {
  isAdmin: TGuard_1 = ({ name, age }) => {
    return { role: 'sss', name, age };
  };
}

type OmitUser = Omit<User33, 'age'>;
const isUser = <T extends Admin>({ name }: T): OmitUser => ({ name, email: 'sss' });

const user: User33 = {
  name: 'V',
  age: 2,
  email: '@.com',
};

console.log(isAdmin(user));
console.log(isUser(isAdmin(user)));

interface OmitPick extends User33 {
  roles: Admin;
}

type GetViePick = ValuesOf<Pick<OmitPick, 'roles'>>;

const getViePick: GetViePick = {
  role: '',
  name: '',
};
