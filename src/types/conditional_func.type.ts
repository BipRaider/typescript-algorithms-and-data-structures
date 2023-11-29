class CU {
  name!: string;
  id!: number;
}

class CUP extends CU {
  ddId!: string;
}

function getUserBydbIdOrId(id: number): CU;
function getUserBydbIdOrId(dbId: string): CUP;
function getUserBydbIdOrId(dbIdOrId: number | string): CU | CUP {
  if (typeof dbIdOrId === 'number') return new CU();

  return new CUP();
}

type CUOrCUP<T extends number | string> = T extends number ? CU : CUP;

function getUserBydbIdOrId_1<T extends number | string>(id: T): CUOrCUP<T> {
  if (typeof id === 'number') return new CU() as CUOrCUP<T>;

  return new CUP() as CUOrCUP<T>;
}
