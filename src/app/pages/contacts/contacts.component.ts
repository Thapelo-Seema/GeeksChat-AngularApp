import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ChatUser } from 'src/app/models/chat-user';
import { take } from 'rxjs';
import { EventService } from '../../services/event.service';
import { ChatMessage } from 'src/app/models/chat-message';
import { WebsocketService } from '../../services/websocket.service';
import { SelectedMessageData } from 'src/app/models/selected-message-data';

//Todo: Send data to chat component via events and factor functionality there

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{

  contacts: ChatUser[] = [];
  contactsMap: Map<number, ChatUser> = new Map<number, ChatUser>();
  contactsMessagesMap: Map<number, ChatMessage[]> = new Map<number, ChatMessage[]>();
  currentUser: ChatUser;
  messages: ChatMessage[] = [];
  message: ChatMessage = new ChatMessage();
  contact: ChatUser;
  showChats: boolean = false;

  constructor(private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute, 
    private eventService: EventService, private webSocketSvc: WebsocketService){
    this.currentUser = new ChatUser();
    this.contact = new ChatUser();
  }

  ngOnInit(): void {
    this.initializeCurrentUser();
    this.userService.getChatUsers(this.currentUser.id).subscribe(users =>{
      this.contacts = users.filter(u => u.id != this.currentUser.id);
      this.initializeContactsMap();
      this.initializeContactMessagesMap();
      this.onNewMessageHandler();
    })
  }


  initializeCurrentUser():void{
    this.activatedRoute.queryParams.pipe(take(1)).subscribe(data =>{
      this.currentUser.id = parseInt(data["id"]);
      this.currentUser.firstName = data["firstName"];
      this.currentUser.lastName = data["lastName"];
      this.currentUser.email = data["email"];
      this.currentUser.handle = data["handle"];
    })
  }

  initializeContactMessagesMap():void{
    this.contacts.forEach(u =>{
      this.contactsMessagesMap.set(u.id, []);
    })
  }

  initializeContactsMap():void{
    this.contacts.forEach(u =>{
      this.contactsMap.set(u.id, u);
    })
  }

  onNewMessageHandler(){
    this.eventService.messageEvent.subscribe(msg =>{
      let contactChatMessageList: ChatMessage[] = this.contactsMessagesMap.get(msg.sender) || [];
      contactChatMessageList.push(msg);
      this.contactsMessagesMap.set(msg.id, contactChatMessageList);
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

  gotoContact(contactId: number): void{
    let selectedContact = this.contactsMap.get(contactId);
    console.log("Current User: ", this.currentUser);
    console.log("Selected Contact: ", selectedContact);
    this.messages = this.contactsMessagesMap.get(contactId) || [];
    let selectedContactData: SelectedMessageData = new 
      SelectedMessageData(this.currentUser.id, this.currentUser.firstName, selectedContact?.id, selectedContact?.firstName,this.messages)
    this.router.navigate(['/chat', this.currentUser.id, contactId], {queryParams: selectedContactData});
  }


  toggleShowChats(){
    this.showChats = !this.showChats;
  }



}
