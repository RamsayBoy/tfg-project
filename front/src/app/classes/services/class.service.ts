import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
  private readonly url: string = environment.apiUrl + "/classes";

  private dateSource = new BehaviorSubject<Date>(new Date());
  currentDate = this.dateSource.asObservable();

  private classSource = new BehaviorSubject<Class[]>([]);
  currentClasses = this.classSource.asObservable();

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

          this.classSource.next(response.data.classes);

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

  isClassAvailable(classObject: Class) {
    const currentTime: number = (Math.floor((new Date).getTime() / 1000));
    const classTime: number = (Math.floor((classObject.date).getTime() / 1000));// + this.getSecondsFromTime(classObject.duration);

    return currentTime > classTime;
  }

  getSecondsFromTime(time: string) {
    let parts = time.split(':');
    return (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]);
  }
}
