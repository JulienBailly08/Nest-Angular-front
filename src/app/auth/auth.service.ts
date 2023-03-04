import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from 'src/environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  @Output() loginDown = new EventEmitter();
  private token!: string | null;

  constructor(private httpClient: HttpClient, private router :Router) { 
    if (localStorage.getItem('cms-angular-token') !== null) {
      this.token = localStorage.getItem('cms-angular-token');
    }
  }

  createUser(User: User) {
    return this.httpClient.post<User>(`${baseURL}/user`, User, this.httpHeaders);
  }

  login(User: User) {
    return this.httpClient.post<any>(`${baseURL}/auth/login`, User, this.httpHeaders).subscribe(res => {
      this.token = res.access_token;
      localStorage.setItem('cms-angular-token', res.access_token);
      this.router.navigate(['']);
    });
  }

  decoderPayloadToken(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }

  get isActivToken() {
    if (!this.token) {
      return false;
    }
    if (Date.now() <= this.decoderPayloadToken(this.token).exp*1000) {
      return true;
    } else {
      return false;
    } 
  }

  get isAdmin() {
    if (!this.token) {
      return false;
    }
    if (this.decoderPayloadToken(this.token).role === 'admin') {
      return true;
    } else {
      return false;
    } 
  }
}
