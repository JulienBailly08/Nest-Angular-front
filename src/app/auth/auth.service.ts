import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  private baseURL = baseURL + '/users';

  constructor(private httpClient: HttpClient) { }

  createUser(User: User) {
    return this.httpClient.post<User>(this.baseURL, User, this.httpHeaders);
  }
}
