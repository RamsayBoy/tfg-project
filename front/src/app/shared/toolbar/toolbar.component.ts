import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public date!: Date;
  @Output('date') onDatePickerEvent: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() { }

  ngOnInit(): void {
    this.date = new Date();
  }

  onDatePick(event: MatDatepickerInputEvent<any, any>): void {
    this.onDatePickerEvent.emit(event.value);
  }
}
