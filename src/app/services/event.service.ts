import { Injectable, EventEmitter } from '@angular/core';
import { ChatUser } from '../models/chat-user';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  loginEvent: EventEmitter<ChatUser> = new EventEmitter<ChatUser>();
  messageEvent: EventEmitter<ChatMessage> = new EventEmitter<ChatMessage>();
  reSubscribeEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  emitLoginEvent(user: ChatUser){
   return this.loginEvent.emit(user);
  }

  emitMessageReceivedEvent(chatMessage: ChatMessage){
    return this.messageEvent.emit(chatMessage);
  }

  emitResubscribeEvent(user: ChatUser){
    return this.reSubscribeEvent.emit(user);
  }
}
