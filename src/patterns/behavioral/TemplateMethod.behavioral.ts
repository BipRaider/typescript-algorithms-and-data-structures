class Form {
  constructor(public name: string) {}
}

abstract class SaveForm<T> {
  public save(form: Form): void {
    const data = this.fill(form);
    this.log(data);
    this.send(data);
  }
  protected abstract fill(form: Form): T;
  protected abstract send(data: T): void;
  protected log(data: T): void {
    console.log(`log =>`, data);
  }
}

class FirstFormTemplate extends SaveForm<string> {
  protected fill = (form: Form): string => form.name;
  protected send(data: string): void {
    console.log('send first :', data);
  }
}

class SecondFormTemplate extends SaveForm<{ name: string }> {
  protected fill = (form: Form): { name: string } => ({ name: form.name });
  protected send(data: { name: string }): void {
    console.log('send second : ', data.name);
  }
}

const form1 = new FirstFormTemplate();
form1.save(new Form('Form 1'));
const form2 = new SecondFormTemplate();
form2.save(new Form('Form 2'));
