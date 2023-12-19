import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ChatUser } from 'src/app/models/chat-user';
import { take } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{

  contacts: ChatUser[] = [];
  currentUser: ChatUser;

  constructor(private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute){
    this.currentUser = new ChatUser();
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.activatedRoute.params.pipe(take(1)).subscribe(params =>{
      console.log("User passed in params: ", params);
      this.currentUser.id = params['id'];
      this.userService.getChatUsers(this.currentUser.id).subscribe(users =>{
        this.contacts = users;
      })
    })
  }

  gotoContact(id: number): void{
    this.router.navigate(['/chat', id]);
  }

}
