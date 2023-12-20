import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../models/chat-message';
import { WebsocketService } from '../services/websocket.service';
import { Message } from '@stomp/stompjs';
import { EventService } from "../services/event.service";
import { ChatUser } from '../models/chat-user';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GeeksMiniProject';
  message: ChatMessage = new ChatMessage();
  chatMessageMap: Map<number, ChatMessage[]>  = new Map<number, ChatMessage[]>();
  currentUser: ChatUser = new ChatUser(0,"", "", "", "");

  constructor(private webSocketSvc: WebsocketService, private eventService: EventService, private router: Router){

  }

  //Todo: clean up and find a way to resubscribe once subscription is lost
  ngOnInit(): void {
    this.webSocketSvc.stompClient.activate();
    this.eventService.reSubscribeEvent.subscribe(userId =>{
      console.log("re-subscribe to: ", userId)
      //this.webSocketSvc.stompClient.activate();
      //.subscribeToPrivateMessages(userId);
    })
    this.eventService.loginEvent.subscribe((user) =>{
      this.currentUser = user;
      //run logic for listening to login service and subscribe to users web socket topics
      this.subscribeToPrivateMessages(user.id);
      const navExtras: NavigationExtras = {state: this.currentUser}
      this.router.navigate(['/contacts', this.currentUser.id], navExtras)
    })
  }

  handleNewMessageEvents(message: Message){
    console.log(JSON.parse(message.body)); 
    const msg: ChatMessage = JSON.parse(message.body)
    this.eventService.emitMessageReceivedEvent(msg);
  }

  subscribeToPrivateMessages(userId: number){
    //this is an endpoint for listening for private messages on the websocket connection already established
    this.webSocketSvc.subscribeToTopic(`/user/${userId}/private`, (message: Message) =>{
      //Handle new message event
      this.handleNewMessageEvents(message);
    });
  }
}
