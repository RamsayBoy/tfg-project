import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO: Change hardcode url
  private registerUrl: string = "http://localhost:3000/api/v0/auth/register";
  private loginUrl: string = "http://localhost:3000/api/v0/auth/login";

  private tokenKeySessionStorage: string = "jwt-token";

  public readonly redirectUrl: string = "/classes";
  public readonly authUrl: string = "/auth/login";

  constructor(
    private http: HttpClient,
  ) { }

  register(): void {
    // TODO
  }

  login(loginFormData: any): Observable<any> {
    // TODO: Ask Enrique if I can share interfaces between angular and node (routes references in .env?)
    return this.http.post<any>(this.loginUrl, loginFormData)
      .pipe( tap(response => this.setTokenInLocalStorage(response.data.token)) );
  }

  private setTokenInLocalStorage(token: string): void {
    localStorage.setItem(this.tokenKeySessionStorage, token);
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

    return expirationTime >= currentTime;
  }

  private getExpirationTime(token: string): number {
    // TODO: Create interface for payload
    const payload: { exp: number } = this.getPayload(token) as any;
    const expirationTime: number = payload.exp;

    return expirationTime;
  }
}
