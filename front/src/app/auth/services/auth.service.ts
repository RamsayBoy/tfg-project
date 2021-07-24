import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
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

  private isUserLoggingInSource = new BehaviorSubject<boolean>(false);
  isUserLoggingInCurrentValue = this.isUserLoggingInSource.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  register(): void {
    // TODO
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
          return user;
        }),
      );
  }

  getUsername(): Observable<string> {
    return this.http.get<ResponseWrapped>(this.BaseUrl + "/users/getUser")
      .pipe(
        map(response => {
          const user: User = response.data.user;
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
  }

  isLogginIn(): boolean {
    const token: string | null = this.getToken();

    if (!token) {
      return false;
    }

    const currentTime: number = (Math.floor((new Date).getTime() / 1000));
    const expirationTime: number = this.getExpirationTime(token);

    const isTimeExpired: boolean = !(expirationTime >= currentTime);

    this.updateCurrentLoggedInValue(!isTimeExpired);
    return !isTimeExpired;
  }

  updateCurrentLoggedInValue(isLoggedIn: boolean) {
    this.isUserLoggingInSource.next(isLoggedIn);
  }

  private getExpirationTime(token: string): number {
    // TODO: Create interface for payload
    const payload: { exp: number } = this.getPayload(token) as any;
    const expirationTime: number = payload.exp;

    return expirationTime;
  }
}
