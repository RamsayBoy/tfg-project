import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import ResponseWrapped from 'src/interfaces/ResponseWrapped.interface';

// TODO: Any was for lazy loaded modules? Or something like that. See it better
//  https://angular.io/guide/providers
//  With providedIn: ClassModule it gives me an error (circular dependency or something like that)
@Injectable({
  providedIn: 'any',
})
export class ClassService {

  // TODO: Form url by using environtment variables
  private readonly url: string = "http://localhost:3000/api/v0/classes";

  constructor(
    private http: HttpClient,
  ) { }

  getClasses(): Observable<ResponseWrapped> {
    return this.http.get<ResponseWrapped>(this.url);
  }
}
