import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationRequest } from '../models/user-registration-request';
import { RegisteUserResponse } from '../models/register-user-response';
import { LoginResponse } from '../models/login-response';
import { TestInterface } from '../models/test-interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse>{
      return this.http.post<LoginResponse>(environment.restApiURL+ "/login", {email: email, password: password})
  }

  register(userRegReq: UserRegistrationRequest): Observable<RegisteUserResponse>{
      return this.http.post<RegisteUserResponse>(environment.restApiURL + "/register", userRegReq);
  }

  testing():Observable<TestInterface>{
    return this.http.post<TestInterface>(environment.restApiURL, {})
  }
}
