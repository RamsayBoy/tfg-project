import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Client from 'src/interfaces/Clients.interface';
import ResponseWrapped from 'src/interfaces/ResponseWrapped.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  // TODO: Form url by using environtment variables
  private readonly url: string = "http://localhost:3000/api/v0/users";

  constructor(
    private http: HttpClient,
  ) { }

  getClients(): Observable<Client[]> {
    // TODO: Uncomment when api part is done
    // return this.http.get<ResponseWrapped>(`${this.url}/getClients`)
    //   .pipe(
    //     map(response => {
    //       response.data.classes.forEach((element: Client) => {
    //         element.date = new Date(element.date);
    //       });
    //       return response.data.classes;
    //     })
    //   );
    // TODO: Delete when api part is done
    return new Observable<Client[]>();
  }
}
