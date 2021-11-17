import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../auth/user.model';
import { NavigationService } from '../services/navigation.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isShown: boolean = false;


  private userSubscribtion: Subscription;

  public loggedIn = false;
  public user: User = null;

  // constructor(private authService: AuthService, private router: Router) { }
  constructor(private authService: AuthService, private router: Router, private navigationService: NavigationService) { }

  ngOnInit(): void {

    this.userSubscribtion = this.authService.userSub.subscribe((user: User) => {
      if (user != null) {
        this.loggedIn = true;
        this.user = user;
      } else {
        this.loggedIn = false;
        this.user = null;
      }
      this.loggedIn = true;
      this.user = user;

    });

  }

  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe()

  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onClk() {
    console.log(this.loggedIn, "LOGGED?");


  }

  onClickLogin() {
    this.navigationService.logInSubject.next(true);


  }

  onClickRegister() {
    this.navigationService.logInSubject.next(false);

  }

  onLoginLogout() {
    console.log("logout");

    if (this.loggedIn == true) {
      this.authService.logout();
    } else {
      this.router.navigate(['/auth'])
    }
    this.navigationService.logInSubject.next(true);

    this.authService.reloadCurrentRoute();


  }

}
