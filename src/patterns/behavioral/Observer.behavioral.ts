interface Observer1 {
  update(subject: Subject): void;
}

interface Subject {
  attach(observer: Observer1): void;
  detach(observer: Observer1): void;
  notify(): void;
}

class Lead {
  constructor(public name: string, public phone: string) {}
}

class NewLead implements Subject {
  protected observers: Observer1[] = [];
  protected _state: Lead;

  public set state(state: Lead) {
    this._state = state;
  }

  attach(observer: Observer1): void {
    if (this.observers.includes(observer)) return;
    this.observers.push(observer);
  }
  detach(observer: Observer1): void {
    const observerIndex = this.observers.indexOf(observer);
    console.dir(observerIndex);
    if (observerIndex === -1) return;
    this.observers.splice(observerIndex, 1);
  }
  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

class NotificationServer_1 implements Observer1 {
  update(subject: Subject): void {
    console.log('NotificationServer got message');
    console.log(subject);
  }
}
class NotificationServer_2 implements Observer1 {
  update(subject: Subject): void {
    console.log('NotificationServer_2 got message');
    console.log(subject);
  }
}

const subject = new NewLead();
subject.state = new Lead('Вася', '09339303039');

const s1 = new NotificationServer_1();
const s2 = new NotificationServer_2();

console.log('----->');
subject.attach(s1);
subject.attach(s2);
subject.notify();
console.log('----->');
subject.detach(s2);
subject.notify();
