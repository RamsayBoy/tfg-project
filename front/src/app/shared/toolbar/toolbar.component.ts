import { SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

// TODO: Move to shared/components/toolbar folder
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input('pageDate') public date!: Date;
  @Output('date') onDatePickerEvent: EventEmitter<Date> = new EventEmitter<Date>();
  @Input('title') public title!: string;
  @Input('showDateControls') public showDateControls: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // TODO: If it does not work, initialize them above
    //this.date = new Date();
    //This is done in classes.component.ts -> this.onDatePickerEvent.emit(this.date);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    for (let propName in changes) {
      // only run when property "data" changed
      if (propName === 'date') {
          //  this line will update posts values
          //this.date = changes[propName].previousValue;
          this.date = changes[propName].currentValue;
          console.log('OnChanges', changes[propName].currentValue);
          //console.log(this.date);
      }
    }
  }

  onDatePick(event: MatDatepickerInputEvent<any, any>): void {
    this.onDatePickerEvent.emit(event.value);
  }

  previousDay(): void {
    let d1 = new Date(this.date);
    d1.setDate(this.date.getDate() - 1);
    //this.date.setDate(this.date.getDate() - 1);
    this.onDatePickerEvent.emit(d1);
  }

  nextDay(): void {
    let d1 = new Date(this.date);
    d1.setDate(this.date.getDate() + 1);
    //this.date.setDate(this.date.getDate() + 1);
    this.onDatePickerEvent.emit(d1);
  }
}
