class TaskIterator {
  constructor(public priority: number) {}
}

class TaskList {
  protected tasks: TaskIterator[] = [];
  public setTasks(task: TaskIterator): void {
    this.tasks.push(task);
  }
  public getTasks = (): TaskIterator[] => this.tasks;
  public count = (): number => this.tasks.length;
  public sortByPriority() {
    this.tasks.sort((a, b): number => {
      if (a.priority == b.priority) return a.priority;
      if (a.priority > b.priority) return a.priority;
      else return b.priority;
    });
  }

  public getIterator = (): IteratorPattern => new IteratorPattern(this);
}

interface IIterator<T> {
  currant(): T | undefined;
  next(): T | undefined;
  prev(): T | undefined;
  index(): number;
}

class IteratorPattern implements IIterator<TaskIterator> {
  private position: number = 0;
  private taskList: TaskList;

  constructor(taskList: TaskList) {
    taskList.sortByPriority();
    this.taskList = taskList;
  }
  currant = (): TaskIterator | undefined => this.taskList.getTasks()[this.position];
  next(): TaskIterator | undefined {
    this.position += 1;
    return this.taskList.getTasks()[this.position];
  }
  prev(): TaskIterator | undefined {
    this.position -= 1;
    return this.taskList.getTasks()[this.position];
  }
  index = (): number => this.position;
}

const taskList = new TaskList();

for (let i = 0; i < 10; i++) {
  taskList.setTasks(new TaskIterator(i));
}

const iterator = taskList.getIterator();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

console.log('-currant->', iterator.currant());
console.log('-index->', iterator.index());

console.log('-prev1->', iterator.prev());
console.log('-index1->', iterator.index());
console.log('-currant1->', iterator.currant());

console.log('-prev2->', iterator.prev());
console.log('-index2->', iterator.index());
console.log('-currant2->', iterator.currant());
