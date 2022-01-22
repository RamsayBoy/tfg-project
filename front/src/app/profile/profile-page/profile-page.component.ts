import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private toolbarService: ToolbarService,
  ) { }

  ngOnInit(): void {
    this.toolbarService.updateTitle("Perfil")
    // this.toolbarService.showClientsTabs(false);
    // this.toolbarService.showDateControls(false);
  }

}
