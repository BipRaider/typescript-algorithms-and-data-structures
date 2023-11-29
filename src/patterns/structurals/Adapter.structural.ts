interface IPersistentDB {
  save(data: object): void;
}

class KVDatabase {
  protected DB: Map<string, string> = new Map();
  save(key: string, value: string): void {
    this.DB.set(key, value);
    console.log('\x1b[32m%s\x1b[0m', '-KVD-->', this.DB);
  }
}

class PersistentDB implements IPersistentDB {
  private DB: Map<string, string> = new Map();
  save(data: object): void {
    for (let [key, value] of Object.entries(data)) {
      this.DB.set(key, value);
    }

    console.log('\x1b[33m%s\x1b[0m', '-PDB-->', this.DB);
  }
}

class PersistentDB_1 implements IPersistentDB {
  private DB: Map<string, string> = new Map();
  save(data: object): void {
    for (let [key, value] of Object.entries(data)) {
      this.DB.set(key, value);
    }

    console.log('\x1b[34m%s\x1b[0m', '-PDB_1-->', this.DB);
  }
}

class PersistentDBAdapter extends KVDatabase {
  constructor(public database: IPersistentDB) {
    super();
  }

  override save(key: string, value: string): void {
    this.database.save({ [key]: value });
    super.save(key + 's', value);
  }
}

function runAdapter(base: KVDatabase): void {
  base.save('Masy', 'value not good');
}

runAdapter(new PersistentDBAdapter(new PersistentDB()));
runAdapter(new PersistentDBAdapter(new PersistentDB_1()));
runAdapter(new KVDatabase());
