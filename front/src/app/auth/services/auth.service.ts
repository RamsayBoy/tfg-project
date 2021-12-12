import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, concat, Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import TokenInfo from 'src/interfaces/Payload.interface';
import ResponseWrapped from 'src/interfaces/ResponseWrapped.interface';
import User from 'src/interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO: Change hardcode url
  private registerUrl: string = "http://localhost:3000/api/v0/auth/register";
  private loginUrl: string = "http://localhost:3000/api/v0/auth/login";
  private BaseUrl: string = "http://localhost:3000/api/v0";

  private tokenKeySessionStorage: string = "jwt-token";

  public readonly redirectUrl: string = "/classes";
  public readonly authUrl: string = "/auth/login";

  public currentUser!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  register(email: string): Observable<ResponseWrapped> {
    return this.http.post<ResponseWrapped>(this.registerUrl, { email });
  }

  // TODO: Change any to the type ResponseWrapped
  login(loginFormData: any): Observable<any> {
    // TODO: Ask Enrique if I can share interfaces between angular and node (routes references in .env?)
    return this.http.post<any>(this.loginUrl, loginFormData)
      .pipe(
        tap(response => {
          this.setTokenInLocalStorage(response.data.token);
        }),
      );
  }

  private setTokenInLocalStorage(token: string): void {
    localStorage.setItem(this.tokenKeySessionStorage, token);
  }

  getUserInfo(): Observable<User> {
    return this.http.get<ResponseWrapped>(this.BaseUrl + "/users/getUser")
      .pipe(
        map(response => {
          const user: User = response.data.user;

          if (!this.currentUser) {
            this.currentUser = user;
          }

          return user;
        }),
      );
  }

  getUsername(): Observable<string> {
    return this.getUserInfo().pipe(
      map(response => {
        const user: User = response;
        let username: string;

        if (user.name) {
          username = user.name;
          if (user.lastName) username += " " + user.lastName;
        }
        else {
          username = user.email;
        }

        return username;
      }),
    );
  }

  getUserRole(): string {
    const defaultRole = 'user';
    const token = this.getToken();

    if (token) {
      const payload: TokenInfo = this.getPayload(token) as any;
      const role: string = payload.payload.role ? payload.payload.role : defaultRole;

      return role;
    }

    return defaultRole;
  }

  // TODO: It is better to put this method in an object called TokenManager or so
  getToken(): string | null {
    const tokenSessionItem: string | null = localStorage.getItem(this.tokenKeySessionStorage);

    if (!tokenSessionItem) {
      return null;
    }

    return tokenSessionItem;
  }

  private getPayload(token: string): string {
    return (JSON.parse(atob(token.split('.')[1])));
  }

  logout() {
    localStorage.removeItem(this.tokenKeySessionStorage);
    // this.updateCurrentLoggedInValue(false);
    this.router.navigateByUrl(this.authUrl);
  }

  isLogginIn(): boolean {
    const token: string | null = this.getToken();

    if (!token) {
      return false;
    }

    const currentTime: number = (Math.floor((new Date).getTime() / 1000));
    const expirationTime: number = this.getExpirationTime(token);

    const isTimeExpired: boolean = !(expirationTime >= currentTime);

    return !isTimeExpired;
  }

  private getExpirationTime(token: string): number {
    // TODO: Create interface for payload
    const payload: { exp: number } = this.getPayload(token) as any;
    const expirationTime: number = payload.exp;

    return expirationTime;
  }
}
