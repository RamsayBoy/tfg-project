import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO: Change hardcode url
  private _registerUrl = "http://localhost:3000/api/v0/auth/register";
  private _loginUrl = "http://localhost:3000/api/v0/auth/login";

  constructor() { }
}
