import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Class from 'src/interfaces/Class.interface';
import ResponseWrapped from 'src/interfaces/ResponseWrapped.interface';

// TODO: Any was for lazy loaded modules? Or something like that. See it better
//  https://angular.io/guide/providers
//  With providedIn: ClassModule it gives me an error (circular dependency or something like that)
@Injectable({
  providedIn: 'root',
})
export class ClassService {

  // TODO: Form url by using environtment variables
  private readonly url: string = "http://localhost:3000/api/v0/classes";

  private dateSource = new BehaviorSubject<Date>(new Date());
  currentDate = this.dateSource.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  getClasses(date: Date): Observable<Class[]> {
    return this.http.get<ResponseWrapped>(this.url + '?date=' + date.toJSON())
      .pipe(
        map(response => {
          response.data.classes.forEach((element: Class) => {
            element.date = new Date(element.date);
          });
          return response.data.classes;
        })
      );
  }

  addOrEditClass(classToPost: Class): Observable<ResponseWrapped> {
    let observable: Observable<ResponseWrapped>;

    if (classToPost.id < 1) {
      observable = this.addClass(classToPost);
    }
    else {
      observable = this.editClass(classToPost);
    }

    return observable;
  }

  addClass(classToAdd: Class): Observable<ResponseWrapped> {
    return this.http.post<ResponseWrapped>(this.url + `/${classToAdd.id}`, classToAdd);
  }

  editClass(classToEdit: Class): Observable<ResponseWrapped> {
    return this.http.put<ResponseWrapped>(this.url + `/${classToEdit.id}`, classToEdit);
  }

  removeClass(classId: number): Observable<ResponseWrapped> {
    return this.http.delete<ResponseWrapped>(this.url + `/${classId}`);
  }

  joinClass(classId: number): Observable<ResponseWrapped> {
    // There is an error if classId is sent as a number. It must be sent as an object.
    return this.http.post<ResponseWrapped>(this.url + "/join", {classId});
  }

  removeFromClass(classId: number): Observable<ResponseWrapped> {
    return this.http.delete<ResponseWrapped>(this.url + `/join/${classId}`);
  }

  updateDate(date: Date) {
    this.dateSource.next(date);
  }
}
