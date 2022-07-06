import { EventEmitter, Injectable } from '@angular/core';
import { Unicorn } from '../classes/unicorn';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public unicornCreated: EventEmitter<Unicorn>;
  public unicornOpened: EventEmitter<Unicorn>;
  public unicornMateChanged: EventEmitter<Unicorn>

  public modalOpened: EventEmitter<string>;
  public modalClosed: EventEmitter<string>;

  constructor() { 
    this.unicornCreated = new EventEmitter();
    this.unicornOpened = new EventEmitter();
    this.unicornMateChanged = new EventEmitter();
    this.modalOpened = new EventEmitter();
    this.modalClosed = new EventEmitter();
  }

  emitUnicornCreated(unicorn: Unicorn) {
    this.unicornCreated.emit(unicorn);
  }

  emitUnicornOpened(unicorn: Unicorn) {
    this.unicornOpened.emit(unicorn);
  }

  emitUnicornMateChanged() {
    this.unicornMateChanged.emit();
  }

  emitModalOpened(id: string) {
    this.modalOpened.emit(id);
  }

  emitModalClosed(id: string) {
    this.modalClosed.emit(id);
  }
}
