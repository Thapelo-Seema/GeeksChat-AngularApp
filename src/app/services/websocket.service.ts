import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chat-message';
import {Client, Message, Stomp} from '@stomp/stompjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  stompClient: Client;
 
  constructor() { 
    const webSocket = new WebSocket(environment.websocketURL)
    this.stompClient = Stomp.over(webSocket);
  }

  public sendMessage(message: ChatMessage){
    this.stompClient.publish({destination: message.topic, body: JSON.stringify(message)});
 }

 subscribeToTopic(topic: string, callback: (message: Message) => void ){
    this.stompClient.subscribe(topic, callback);
  }
}
