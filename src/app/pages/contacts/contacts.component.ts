import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ChatUser } from 'src/app/models/chat-user';
import { take } from 'rxjs';
import { EventService } from '../../services/event.service';
import { ChatMessage } from 'src/app/models/chat-message';
import { WebsocketService } from '../../services/websocket.service';

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
    const navigation = this.router.getCurrentNavigation();
    this.activatedRoute.params.pipe(take(1)).subscribe(params =>{
      console.log("User passed in params: ", params);
      this.currentUser.id = params['id'];
      this.eventService.emitResubscribeEvent(this.currentUser.id);
      this.userService.getChatUsers(this.currentUser.id).subscribe(users =>{
        this.contacts = users.filter(u => u.id != this.currentUser.id);
      
        users.forEach(u =>{
          if(u.id != this.currentUser.id) this.contactsMap.set(u.id, u);
        })
        //initialize contact messages map
        this.contacts.forEach(u =>{
          this.contactsMessagesMap.set(u.id, []);
        })

        this.eventService.messageEvent.subscribe(msg =>{
         let contactChatMessageList: ChatMessage[] = this.contactsMessagesMap.get(msg.sender) || [];
         contactChatMessageList.push(msg);
         this.contactsMessagesMap.set(msg.id, contactChatMessageList);
        })
       
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
    //this.message.txtContent = "";
  }

  gotoContact(contactId: number): void{
    //this.router.navigate(['/chat', this.currentUser.id, contactId]);
    this.contact.id = contactId;
    this.messages = this.contactsMessagesMap.get(contactId) || [];
    this.showChats = true;
  }

  toggleShowChats(){
    this.showChats = !this.showChats;
  }



}
