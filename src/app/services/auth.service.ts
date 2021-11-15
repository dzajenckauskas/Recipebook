import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';


export interface AuthResponse {
  idToken: string,	//A Firebase Auth ID token for the authenticated user.
  email: string, //	The email for the authenticated user.
  refreshToken: string,	//A Firebase Auth refresh token for the authenticated user.
  expiresIn: string, //	The number of seconds in which the ID token expires.
  localId: string,	//The uid of the authenticated user.
  registered?: boolean //	Whether the email is for an existing account.

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;
  private adminEmail = "d.zajenckauskas@gmail.com"
  public userSub = new Subject<User>();
  public isAdmin = false;
  // public userSub = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient, private router: Router) { }


  private userAuth(response: AuthResponse) {
    this.user = new User(
      response.email,
      response.localId,
      response.idToken,
      new Date(new Date().getTime() + +response.expiresIn * 1000)
    );
    if (this.user.email == this.adminEmail)
      this.isAdmin = true;
    else
      this.isAdmin = false;
    this.userSub.next(this.user)
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUIe_oy_C5P8sbHWcFyE-8lroDxNUMn-I',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(tap((response) => {
        this.userAuth(response)

      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUIe_oy_C5P8sbHWcFyE-8lroDxNUMn-I',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(tap((response) => {
        this.userAuth(response)

      }));

  }

  savedLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    if (new Date(user.expires) < new Date()) return;
    this.user = new User(user.email, user.id, user.token, new Date(user.expires));
    this.userSub.next(this.user)
    this.router.navigate(['/']);

  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  logout() {
    this.user = null;
    this.userSub.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/auth', 'login'])
    this.reloadCurrentRoute();
  }
}
