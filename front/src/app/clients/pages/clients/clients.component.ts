import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LoaderService } from 'src/app/shared/loader/services/loader.service';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';
import Client from 'src/interfaces/Clients.interface';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  public clients$!: Observable<Client[]>;
  public thereIsAnError$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private toolbarService: ToolbarService,
    private clientsService: ClientsService,
    private dialogService: DialogService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.toolbarService.updateTitle("Alumnos");
    this.toolbarService.showClientsTabs(true);

    this.getClients();
  }

  getClients(): void {
    window.scroll(0, 0);

    this.clients$ = this.clientsService.getClients();

    this.clients$.subscribe(
      data => {
        this.thereIsAnError$.next(false);
      },
      error => {
        this.thereIsAnError$.next(true);
        this.dialogService.open('Error', error);
      }
    );
  }

  deleteUserRegisteredDialog(client: Client) {
    this.dialogService.openConfirm(
      `¿Desea eliminar a este usuario?`,
      `Si borra al usuario \"${this.clientsService.getUserDisplayableName(client)}\" se eliminarán todos sus datos del sistema de manera permanente.`,
      "No",
      "Sí"
    )
    .afterClosed()
    .subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteUserRegistered(client);
      }
    });
  }

  deleteUserRegistered(client: Client): void {
    this.loaderService.setLoader(true);

    this.clientsService.removeClient(client.id).subscribe({
      next: () => {
        this.clients$ = this.clients$.pipe(
          map(clients => clients.filter(currentClient => currentClient.id !== client.id)),
        );

        this.loaderService.setLoader(false);
      },
      error: (error) => {
        this.dialogService.open('Error', error)
      },
    });
  }

  ngOnDestroy(): void {
    this.toolbarService.showClientsTabs(false);
  }

}
