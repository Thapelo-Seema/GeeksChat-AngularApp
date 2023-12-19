import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../models/chat-message';
import { WebsocketService } from '../../services/websocket.service';
import { Message } from '@stomp/stompjs';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ChatUser } from 'src/app/models/chat-user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  title = 'GeeksMiniProject';
  message: ChatMessage = new ChatMessage();
  messages: ChatMessage[] = [];
  currentUser: ChatUser;
  contact: ChatUser;

  constructor(private webSocketSvc: WebsocketService, private activatedRoute: ActivatedRoute){
    this.currentUser = new ChatUser();
    this.contact = new ChatUser();
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1))
    .subscribe(params =>{
      this.contact.id = params["id"];
    })
  }

  handleSendMessage(){
    //this is an endpoint for sending private messages on the websocket connection already established
    let tempMessage = new ChatMessage();
    this.message.topic = "/app/private-message"; 
    tempMessage.txtContent = this.message.txtContent;
    tempMessage.sender = this.currentUser.id;
    tempMessage.receiver = this.contact.id;
    tempMessage.topic = this.message.topic;
    this.messages.push(tempMessage);
    this.webSocketSvc.sendMessage(tempMessage);
    this.message.txtContent = "";
  }

  registerUser(){
    //this is an endpoint for listening for private messages on the websocket connection already established
    
  }
}
