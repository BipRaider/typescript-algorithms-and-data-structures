class User {
  public userId: number;
  constructor(public name: string) {
    this.userId = Math.floor(Math.random() * (10 - 1) + 1);
  }
}
///----------------------
class CommandHistory {
  private db: Map<number, Command> = new Map();
  set(command: Command): void {
    this.db.set(command.commandId, command);
  }
  remove(commandId: number): void {
    this.db.delete(commandId);
  }
  get = (commandId: number): Command | undefined => this.db.get(commandId);
}
//------------------
abstract class Command {
  public commandId: number;
  abstract execute(): void;
  abstract undo(): void;
  constructor(protected history: CommandHistory) {
    this.commandId = Math.floor(Math.random() * (100 - 1) + 1);
  }
}
//---------------------
class UserServer {
  protected db: Map<number, User> = new Map();

  public saveUser = (user: User): void => {
    this.db.set(user.userId, user);
  };

  public updateUser(user: User): void {
    const oldUser = this.db.get(user.userId);
    if (oldUser) this.deleteUser(user.userId);
    this.db.set(user.userId, { ...oldUser, ...user });
  }
  public getUser = (userId: number): User | undefined => this.db.get(userId);
  public deleteUser = (userId: number): void => {
    this.db.delete(userId);
  };
}
//------------------
class AddUserCommand extends Command {
  constructor(private user: User, protected receiver: UserServer, history: CommandHistory) {
    super(history);
  }
  execute(): void {
    this.receiver.saveUser(this.user);
    this.history.set(this);
  }

  public undo(): void {

    this.receiver.deleteUser(this.user.userId);
    this.history.remove(this.commandId);
    console.log('1');
  }
}
//------------------
class UpdateUserCommand extends Command {
  constructor(private user: User, private oldUser: User, protected receiver: UserServer, history: CommandHistory) {
    super(history);
  }
  execute(): void {
    this.receiver.updateUser(this.user);
    this.history.set(this);
  }

  undo(): void {

    this.receiver.saveUser(this.oldUser);
    this.history.remove(this.commandId);

    console.dir(this.oldUser);
    console.log('2');
  }
}
//------------------
class Controller {
  receiver: UserServer;
  history: CommandHistory = new CommandHistory();

  public addReceiver(receiver: UserServer): void {
    this.receiver = receiver;
  }

  add(name: string): void {

    const user = new User(name);
    const addUserCommand = new AddUserCommand(user, this.receiver, this.history);
    addUserCommand.execute();
  }

  update(name: string, id: number): void {
    const oldUser = this.receiver.getUser(id);

    if (oldUser) {
      const user = new User(name);
      user.userId = oldUser.userId;
      const updateUserCommand = new UpdateUserCommand(
        user,
        oldUser,
        this.receiver,
        this.history,
      );
      updateUserCommand.execute();
    }
  }
  undo(commandId: number) {
    const command = this.history.get(commandId);
    command ? command.undo() : console.log('not found');
  }
  logger() {
    console.log('-history->', this.history);
    console.log('-receiver->', this.receiver);
  }
}

const controller = new Controller();
controller.addReceiver(new UserServer());
controller.add('User name');
controller.add('User1 name');
controller.update('Update', 4);
controller.add('User2 name');
controller.add('User3 name');
controller.update('Update', 2);
controller.add('User4 name');
controller.add('User5 name');
controller.update('Update', 6);

for (let index = 0; index < 95; index++) {
  controller.undo(index);
}

controller.logger();
