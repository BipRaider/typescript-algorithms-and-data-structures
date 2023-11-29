interface IMediator {
  notify(sender: string, event: string, message: string): void;
}
abstract class Mediated {
  mediator: IMediator;
  initMediator(mediator: IMediator): void {
    this.mediator = mediator;
  }
}

type ColorLog = 0 | 1 | 2 | 3 | 4 | 5 | 6;

class Logger {
  constructor(public name?: string) {}
  log(message: string, type: ColorLog = 2) {
    if (this.name) console.log(`\x1b[3${type}m%s\x1b[0m`, `[${this.name}] :`, `\x1b[3${type + 1}m`, message);
    else console.log(`\x1b[3${type}m%s\x1b[0m`, message);
  }
}

class Notifications {
  send(sender: string): void {
    console.log('Class notifications :' + sender);
  }
}
class EventHandler extends Mediated {
  event(message: string, event: string): void {
    this.mediator.notify('EventHandler', event, message);
  }
}

class NotificationMediator implements IMediator {
  constructor(public notification: Notifications, public logger: Logger, public eventHandler: EventHandler) {}

  notify(sender: string, event: string, message: string): void {
    switch (event) {
      case 'on':
        this.notification.send(sender);
        this.logger.log(message, 2);
        break;
      case 'emit':
        this.logger.log(message, 3);
        break;
      case 'event':
        this.eventHandler.event(message, 'on');
        this.logger.log(message, 4);
        break;
      default:
        break;
    }
  }
}

const logger = new Logger('Logger');
const notifications = new Notifications();
const eventHandler = new EventHandler();

const mediator = new NotificationMediator(notifications, logger, eventHandler);
eventHandler.initMediator(mediator);

eventHandler.event('Emit', 'emit');
eventHandler.event('On', 'on');
eventHandler.event('Event', 'event');

mediator.notify('sender', 'on', 'Sender mediator');
mediator.notify('sender', 'emit', 'Sender mediator 1');

mediator.notify('sender', 'event', 'Sender mediator 2');
