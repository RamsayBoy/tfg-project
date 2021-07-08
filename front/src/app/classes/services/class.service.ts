import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Class from 'src/interfaces/Class.interface';
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

  getClasses(): Observable<Class[]> {
    return this.http.get<ResponseWrapped>(this.url)
      .pipe(
        map(response => {
          response.data.classes.forEach((element: Class) => {
            element.date = new Date(element.date);
          });
          return response.data.classes;
        })
      );
  }
}
