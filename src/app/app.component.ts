import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAdmin: boolean = false;
  isLoggedAndActiv: boolean = false;

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void { 
    this.isAdmin = this.authService.isAdmin;
    this.isLoggedAndActiv = this.authService.isActivToken;
  }

  logOut() {
    localStorage.removeItem('cms-angular-token');
    window.location.reload();
  }
}
