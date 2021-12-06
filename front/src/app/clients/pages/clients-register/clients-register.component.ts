import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';

@Component({
  selector: 'app-clients-register',
  templateUrl: './clients-register.component.html',
  styleUrls: ['./clients-register.component.css']
})
export class ClientsRegisterComponent implements OnInit {

  constructor(
    private toolbarService: ToolbarService,
  ) { }

  ngOnInit(): void {
    this.toolbarService.updateTitle("Alumnos");
    this.toolbarService.showClientsTabs(true);
  }

  ngOnDestroy(): void {
    this.toolbarService.showClientsTabs(false);
  }

}
