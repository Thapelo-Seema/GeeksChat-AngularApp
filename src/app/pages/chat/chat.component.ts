import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../models/chat-message';
import { WebsocketService } from '../../services/websocket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ChatUser } from 'src/app/models/chat-user';
import { EventService } from '../../services/event.service';

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

  constructor(private webSocketSvc: WebsocketService, private activatedRoute: ActivatedRoute, private eventService: EventService){
    this.currentUser = new ChatUser();
    this.contact = new ChatUser();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe(data =>{
      console.log(data)
      this.initializeUsers();
      this.eventService.emitResubscribeEvent(this.currentUser);
      this.initializeMessages();
      this.registerOnNewMessageHandler();
    })
  }

  initializeUsers():void{
    this.activatedRoute.queryParams.pipe(take(1)).subscribe(data =>{
      this.currentUser.id = data["currentUserId"];
      this.currentUser.firstName = data["currentUserName"];
      this.contact.id = data["contactId"];
      this.contact.firstName = data["contactName"];
    })
  }

  registerOnNewMessageHandler():void{
    this.eventService.messageEvent.subscribe(msg =>{
      if(msg.sender != this.currentUser.id)
        this.messages.push(msg);
    })
  }


  initializeMessages(){
    this.activatedRoute.queryParams.pipe(take(1)).subscribe(data =>{
      let initialMessages: ChatMessage[]  = data["messages"];
      initialMessages?.forEach((msg:ChatMessage) =>{
        this.messages.push(msg);
      })
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
