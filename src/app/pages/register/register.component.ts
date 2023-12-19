import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationRequest } from '../../models/user-registration-request';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userRegReq: UserRegistrationRequest = {
    firstName: "", lastName: "", email: "", password: "", handle: ""
  }

  constructor(private authService: AuthService, private router: Router){

  }

  navigateToLogin(){
    this.router.navigate(['/login'])
  }

  register(){
    this.authService.register(this.userRegReq)
    .pipe(take(1)).subscribe(u =>{
      console.log(u)
    })
  }
}
