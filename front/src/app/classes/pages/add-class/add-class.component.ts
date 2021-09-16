import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  public model = '0000';
  public timemask = [/\d/, /\d/, ':', /\d/, /\d/];

  constructor(
    private toolbar: ToolbarService,
  ) { }

  ngOnInit(): void {
    this.toolbar.updateTitle("Añadir clase");
    this.toolbar.showDateControls(false);
  }

}
