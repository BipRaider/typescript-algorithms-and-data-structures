export type Anyfunc = (...args: any[]) => any;
export type Dictionary = {
  [key: string]: TMap;
};
export type TMap = string | number | Anyfunc | Object;
export type TOldMap = {
  updateAt: Date;
  data: TMap;
};

export default class Singleton {
  private static instance: Singleton;
  #data: Map<string, TMap> = new Map();
  private dataOld: Map<string, TOldMap[]> = new Map();
  private weakMap: WeakMap<object, TOldMap[]> = new WeakMap();
  private weakSet: WeakSet<object> = new WeakSet();

  constructor() {
    if (Singleton.instance instanceof Singleton) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    return this;
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  public getAllData(): Dictionary {
    const data = Object.fromEntries(this.#data);
    return data;
  }

  public set data(data: [string, TMap]) {
    const check = this.#data.has(data[0]);
    if (check) {
      const old = this.#data.get(data[0]) as TMap;
      let oldData = this.dataOld.get(data[0]);

      const newData: TOldMap = {
        updateAt: new Date(),
        data: old,
      };

      if (oldData) {
        if (oldData.length >= 3) oldData.splice(0, 1);

        this.dataOld.set(data[0], [...oldData, newData]);
      } else this.dataOld.set(data[0], [newData]);
    }

    this.#data.set(data[0], data[1]);
  }

  public size() {
    return { data: this.#data.size, old: this.dataOld.size };
  }

  public get(data: string): TMap {
    return this.#data.get(data) ?? 'Not found';
  }

  public getOld(data: string): any {
    return this.dataOld.get(data) ?? 'Not found';
  }
  public delete(data: string): void {
    this.#data.delete(data);
  }
  public get _weakSet(): WeakSet<object> {
    return this.weakSet;
  }
  public get _weakMap(): WeakMap<object, TOldMap[]> {
    return this.weakMap;
  }
}

function SingletonCode() {
  const first = Singleton.getInstance();
  const second = new Singleton();
  const third = Singleton.getInstance();

  if (first === second) {
    console.time('first');
    first.data = ['first', 1];
    second.data = ['first', 2];
    first.data = ['first', 3];
    second.data = ['first', 4];
    first.data = ['first', 'first'];
    third.data = ['first', 33];
    second.data = ['first', (): string => 'first_second'];
    first.data = ['second', (): string => 'second'];
    second.data = ['second', (): string => 'second1'];
    console.timeEnd('first');
    const first_1 = second.get('first');
    const second_1 = first.get('first');

    console.log('\x1b[32m%s\x1b[0m', 'Data from Singleton ->', { first, second, third });

    console.log('\x1b[32m%s\x1b[0m', 'Size ->', second.size());

    console.log('\x1b[34m%s\x1b[0m', '-getOld-second->', second.getOld('first'));
    console.log('\x1b[34m%s\x1b[0m', '-getOld2-first->', first.getOld('first'));
    console.log('\x1b[34m%s\x1b[0m', '-getOld3-third->', third.getOld('first'));
    typeof first_1 === 'function'
      ? console.log('\x1b[33m%s\x1b[0m', 'Get_1', first_1())
      : console.log('\x1b[33m%s\x1b[0m', 'Get_1_1', first_1);

    typeof second_1 === 'function'
      ? console.log('\x1b[33m%s\x1b[0m', 'Get_1', second_1())
      : console.log('\x1b[33m%s\x1b[0m', 'Get_1_1', second_1);

    console.log('\x1b[31m%s\x1b[0m', 'All data from Singleton ->', third.getAllData());
  } else {
    console.log('\x1b[32m%s\x1b[0m', 'Singleton failed, variables contain different instances.');
  }
}

SingletonCode();
