interface IProxy {
  save(d: number): IProxyParams | undefined;
}

interface IProxyParams {
  name: string;
  id: number;
}

class ClassForProxy implements IProxy {
  private data: IProxyParams[] = [{ name: 'sssss', id: 1 }];

  save(id: number): IProxyParams | undefined {
    return this.data.find(data => data.id === id);
  }
}

class ApiProxy implements IProxy {
  constructor(private api: IProxy, private userId: number) {}

  save(id: number): IProxyParams | undefined {
    if (this.userId === 1) {
      return this.api.save(id);
    }
    console.log('\x1b[31m%s\x1b[0m', 'Is not found');
    return undefined;
  }
}

const proxy = new ApiProxy(new ClassForProxy(), 1);
const proxy_1 = new ApiProxy(new ClassForProxy(), 2);
console.log('\x1b[33m%s\x1b[0m', '-PDB-->', proxy.save(1));
console.log('\x1b[33m%s\x1b[0m', '-PDB-->', proxy_1.save(1));
