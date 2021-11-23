import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  constructor(
    private toolbarService: ToolbarService,
  ) { }

  ngOnInit(): void {
    this.toolbarService.updateTitle("Administración");
  }

}
