import Logger from '../helper/logger.helper';

const logger = new Logger('State');

abstract class DocumentItemState {
  public name: string;
  public item: DocumentItem;

  public setContext(item: DocumentItem): void {
    this.item = item;
  }
  public abstract publish(): void;
  public abstract delete(): void;
}

class DocumentItem {
  public text: string;
  private state: DocumentItemState;
  constructor() {
    this.setState(new DraftDocumentItemState());
  }
  setState(state: DocumentItemState): void {
    this.state = state;
    this.state.setContext(this);
  }
  getState(): DocumentItemState {
    return this.state;
  }
  publishDoc(): void {
    this.state.publish();
  }
  deleteDoc(): void {
    this.state.delete();
  }
}

class DraftDocumentItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = 'DraftDocument';
  }
  public publish(): void {
    logger.log(2, `Text send to site ${this.item.text}`);
    this.item.setState(new PublishDocumentItemState());
  }
  public delete(): void {
    logger.log(2, 'State draft delete');
  }
}

class PublishDocumentItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = 'PublishDocument';
  }
  public publish(): void {
    logger.log(2, 'Sorry, You can not make it , that was done', 1);
  }
  public delete(): void {
    logger.log(2, 'Return to draft');
    this.item.setState(new DraftDocumentItemState());
  }
}

const item = new DocumentItem();

item.text = ' Any text ';
console.log(item.getState());
item.publishDoc();
console.log(item.getState());
item.publishDoc();
item.deleteDoc();
console.log(item.getState());
