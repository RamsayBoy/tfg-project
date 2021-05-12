import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO: Change hardcode url
  private registerUrl = "http://localhost:3000/api/v0/auth/register";
  private loginUrl = "http://localhost:3000/api/v0/auth/login";
  public redirectUrl = "/classes";

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
    // Get token expiresIn time
    const tokenExpiresIn: number = (JSON.parse(atob(token.split('.')[1]))).exp;
    const expiresIn: number = Date.now() + tokenExpiresIn;

    // Create item for session storage with the token and its expire time
    const tokenSessionItem: {token: string, expiresIn: number} = {
      token: token,
      expiresIn: expiresIn,
    }

    localStorage.setItem('token', JSON.stringify(tokenSessionItem));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogginIn(): boolean {
    const tokenExpiresIn: number | null = this.getExpiration();

    if (!tokenExpiresIn) {
      return false;
    }

    const currentTime: number = new Date().getSeconds();

    // TODO: See if it is OK (comparing by seconds)
    return currentTime < tokenExpiresIn;
  }

  private getExpiration(): number | null {
    const tokenSessionItem: string | null = localStorage.getItem('token');

    if (!tokenSessionItem) {
      return null;
    }

    return JSON.parse(tokenSessionItem).expiresIn;
  }

  isLogginOut(): boolean {
    return !this.isLogginIn();
  }

  getJwtToken(): string | null {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    return token;
  }
}
