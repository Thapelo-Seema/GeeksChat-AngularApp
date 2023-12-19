import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatUser } from '../models/chat-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

  }

  getChatUsers(currentUserId: number): Observable<ChatUser[]>{
    return this.http.get<ChatUser[]>(environment.restApiURL+ `/users/${currentUserId}`)
  }
}
