import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  constructor(
    private toolbarService: ToolbarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.toolbarService.updateTitle("Alumnos");
    this.toolbarService.showClientsTabs(true);
  }

  ngOnDestroy(): void {
    this.toolbarService.showClientsTabs(false);
  }

}
