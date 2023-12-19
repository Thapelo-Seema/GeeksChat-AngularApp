import { Injectable, EventEmitter } from '@angular/core';
import { ChatUser } from '../models/chat-user';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  loginEvent: EventEmitter<ChatUser> = new EventEmitter<ChatUser>();
  constructor() { }

  emitLoginEvent(user: ChatUser){
   return this.loginEvent.emit(user);
  }
}
