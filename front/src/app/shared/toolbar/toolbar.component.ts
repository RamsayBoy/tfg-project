import { OnDestroy, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { ClassService } from 'src/app/classes/services/class.service';

// TODO: Move to shared/components/toolbar folder
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  @Input() title: string = "";
  date!: Date;
  @Input('showDateControls') showDateControls: boolean = true;

  dateSubscription!: Subscription;

  constructor(
    private classService: ClassService
  ) { }

  ngOnInit(): void {
    this.dateSubscription = this.classService.currentDate.subscribe(date => {
      console.log('toolbar',this.date)
      this.date = date;
    });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   for (let propName in changes) {
  //     if (propName === 'date') {
  //         this.date = changes[propName].currentValue;
  //     }
  //   }
  // }

  onDatePick(event: MatDatepickerInputEvent<any, any>): void {
    this.classService.updateDate(event.value);
  }

  previousDay(): void {
    let d1 = new Date(this.date);
    d1.setDate(this.date.getDate() - 1);
    //this.date.setDate(this.date.getDate() - 1);
    // this.onDatePickerEvent.emit(d1);
  }

  nextDay(): void {
    let d1 = new Date(this.date);
    d1.setDate(this.date.getDate() + 1);
    //this.date.setDate(this.date.getDate() + 1);
    // this.onDatePickerEvent.emit(d1);
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }
}
