import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

// TODO: Move to shared/components/toolbar folder
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public date!: Date;
  @Output('date') onDatePickerEvent: EventEmitter<Date> = new EventEmitter<Date>();
  @Input('title') public title!: string;
  @Input('showDateControls') public showDateControls: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // TODO: If it does not work, initialize them above
    this.date = new Date();
    this.onDatePickerEvent.emit(this.date);
  }

  onDatePick(event: MatDatepickerInputEvent<any, any>): void {
    this.onDatePickerEvent.emit(event.value);
  }

  previousDay(): void {
    this.date.setDate(this.date.getDate() - 1);
    this.onDatePickerEvent.emit(this.date);
  }

  nextDay(): void {
    this.date.setDate(this.date.getDate() + 1);
    this.onDatePickerEvent.emit(this.date);
  }
}
