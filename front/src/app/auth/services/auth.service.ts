import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO: Change hardcode url
  private _registerUrl = "http://localhost:3000/api/v0/auth/register";
  private _loginUrl = "http://localhost:3000/api/v0/auth/login";

  constructor(
    private _http: HttpClient
  ) { }

  register(): void {
    // TODO
  }

  login(loginFormData: any): Observable<any> {
    return this._http.post<any>(this._loginUrl, loginFormData);
  }

  // TODO: Maybe it is better to pass the token directly
  setLocalStorage(responseObject: any): void {
    // Get token expiresIn time
    const tokenExpiresIn: number = (JSON.parse(atob(responseObject.data.token.split('.')[1]))).exp;
    const expiresIn: number = Date.now() + tokenExpiresIn;

    // Create item for session storage with the token and its expire time
    const tokenSessionItem: {token: string, expiresIn: number} = {
      token: responseObject.data.token,
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

  isLogginOut(): boolean {
    return !this.isLogginIn();
  }

  getExpiration(): number | null {
    const tokenSessionItem: string | null = localStorage.getItem('token');

    if (!tokenSessionItem) {
      return null;
    }

    return JSON.parse(tokenSessionItem).expireIn;
  }
}
