import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import ResponseWrapped from 'src/interfaces/ResponseWrapped.interface';
import User from 'src/interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  updateUserInfo(user: User): Observable<ResponseWrapped> {
    return this.http.put<ResponseWrapped>(`${environment.apiUrl}/users/${user.id}`, user);
  }

  changePassword(id: number, newPassword: string): Observable<ResponseWrapped> {
    return this.http.put<ResponseWrapped>(`${environment.apiUrl}/users/${id}/changePassword`, newPassword);
  }
}
