type UnionType = number | string | boolean | Function;

const roles = ['admin', 'user', 'super-admin'] as const;

type ExcludeRole = Exclude<UnionType, number>;

type ExtractRole = Extract<UnionType, number | string>;

type Roles = (typeof roles)[number];
//type Roles = "admin" | "user" | "super-admin"

interface Permission {
  endDate: Date;
}

interface Role {
  name: string;
}

interface UnionUser {
  name: string;
  roles: Role[];
  permission: Permission;
}

const union_user: UnionUser = {
  name: 'Admin',
  roles: [],
  permission: {
    endDate: new Date(),
  },
};
const user_name = union_user['name']; //string

const union_type_roles = 'roles';
let union_type_roles1: 'roles' = 'roles';

type roleType = UnionUser['roles']; //Role[]
type roleType1 = UnionUser[typeof union_type_roles]; //Role[]
type roleType2 = UnionUser[typeof union_type_roles1]; //Role[]

type roleType3 = UnionUser['roles'][number]; //Role
type roleType4 = UnionUser[typeof union_type_roles1][number]; //Role

type roleType5 = UnionUser['roles'][number]['name']; //string

type permissionType = UnionUser['permission']; //Permission

type dateType = UnionUser['permission']['endDate']; //Date

function FuncUnionType(params: { a: number } | { b: string }) {
  if ('a' in params) return params.a;
  if ('b' in params) return params.b;
}

function FuncUnionType2(a: number | string, b: string | boolean) {
  if (a === b) {
    return a + b;
  }
}
