import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { User } from '../auth/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  admin: boolean;
  constructor(private authService: AuthService) { }





  ngOnInit(): void {
    this.admin = this.authService.isAdmin;
    this.user = this.authService.user;
  }



  onLogout() {
    this.authService.logout();

  }

}
