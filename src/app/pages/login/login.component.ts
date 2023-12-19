import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ChatUser } from '../../models/chat-user';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';
import { LoginResponse } from 'src/app/models/login-response';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  chatUser: ChatUser;
  password: string = "";
  msgSubscription: any = null;
  constructor(private router: Router, private eventService: EventService, private authService: AuthService){
      this.chatUser = new ChatUser(0, "first name", "last name", "email");
  }

  ngOnInit(): void {
     //this.webSocketSvc.stompClient.activate();
  }

  login(){
    this.authService.login(this.email, this.password)
    .pipe(take(1))
    .subscribe(LoginResponse =>{
      this.chatUser = LoginResponse;
      console.log(LoginResponse);
      this.eventService.emitLoginEvent(this.chatUser)
      //this.router.navigate(['/contacts']);
    })
    
  }

  register(){
    this.router.navigate(['/register']);
  }

}
