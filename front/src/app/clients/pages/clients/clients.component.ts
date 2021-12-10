import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
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

  ngOnDestroy(): void {
    this.toolbarService.showClientsTabs(false);
  }

}
