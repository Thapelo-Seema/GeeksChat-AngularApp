import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatUser } from '../models/chat-user';
import { UserRegistrationRequest } from '../models/user-registration-request';
import { RegisteUserResponse } from '../models/register-user-response';
//import { LoginResponse } from '../models/login-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<ChatUser>{
      return this.http.post<ChatUser>(environment.restApiURL+ "/login", {email: email, password: password})
  }

  register(userRegReq: UserRegistrationRequest): Observable<RegisteUserResponse>{
      return this.http.post<RegisteUserResponse>(environment.restApiURL + "/register", userRegReq);
  }
}
