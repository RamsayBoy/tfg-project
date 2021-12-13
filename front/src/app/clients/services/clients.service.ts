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
    return this.http.get<ResponseWrapped>(`${this.url}/getClients`)
      .pipe(
        map(response => {
          let clients: Client[] = response.data.clients;
          return clients;
        })
      );
  }

  removeClient(clientId: number): Observable<ResponseWrapped> {
    return this.http.delete<ResponseWrapped>(this.url + `/${clientId}`);
  }

  getUserDisplayableName(client: Client): string {
    let name: string = 'Usuario';

    if (client) {
      if (client.name) {
        name = client.name;

        if (client.lastName) {
          name += ' ' + client.lastName;
        }
      }
      else {
        name = client.email;
      }
    }

    return name;
  }
}
