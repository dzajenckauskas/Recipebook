import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponse } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin = true;
  isLoading = false;
  errorMessage = null;


  constructor(private authService: AuthService, private router: Router, private navigationService: NavigationService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      if (params.action == "login") {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }

    });
    this.navigationService.logInSubject.subscribe((isLogin) => {
      this.isLogin = isLogin;
    })
  }

  onSwitch() {
    this.errorMessage = null;

    this.isLogin = !this.isLogin;
  }

  onSubmit(authForm: NgForm) {
    this.isLoading = true;
    let authObservable: Observable<AuthResponse>;

    if (this.isLogin) {
      authObservable = this.authService.login(authForm.value.email, authForm.value.password);
    } else {
      authObservable = this.authService.signup(authForm.value.email, authForm.value.password);
    }
    authObservable.subscribe((result) => {
      console.log(this.authService.user);
      this.isLoading = false;
      this.errorMessage = null;
      this.router.navigate(['/'])

    }, (error) => {
      this.errorMessage = "Įvyko nežinoma klaida"
      if (error.error && error.error.error) {
        switch (error.error.error.message) {
          case 'EMAIL_EXISTS': this.errorMessage = "Toks vartotojo email jau uzregistruotas";
            break;
          case 'EMAIL_NOT_FOUND': this.errorMessage = "Toks vartotojo email nerastas";
            break;
          case 'INVALID_PASSWORD': this.errorMessage = "Neteisingas slaptazodis";
            break;
        }
        this.isLoading = false;

      }

      // this.isLogin = false;

    });

  }

}
