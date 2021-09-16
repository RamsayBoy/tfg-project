import { OnDestroy, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { ClassService } from 'src/app/classes/services/class.service';
import { ToolbarService } from './services/toolbar.service';

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
  @Output() onMenuButtonClick: EventEmitter<any> = new EventEmitter();

  dateSubscription!: Subscription;
  titleSubscription!: Subscription;
  dateControlsSubscription!: Subscription;

  constructor(
    private classService: ClassService,
    private toolbarService: ToolbarService,
  ) { }

  ngOnInit(): void {
    this.dateControlsSubscription = this.toolbarService.areDateControlsShown.subscribe(areShown => {
      this.showDateControls = areShown;
    });
    this.titleSubscription = this.toolbarService.currentTitle.subscribe(title => {
      this.title = title;
    });
    this.dateSubscription = this.classService.currentDate.subscribe(date => {
      this.date = date;
    });
  }

  onDatePick(event: MatDatepickerInputEvent<any, any>): void {
    this.classService.updateDate(event.value);
  }

  previousDay(): void {
    let d1 = new Date(this.date);
    d1.setDate(this.date.getDate() - 1);
    //this.date.setDate(this.date.getDate() - 1);
    // this.onDatePickerEvent.emit(d1);
    this.classService.updateDate(d1);
  }

  nextDay(): void {
    let d1 = new Date(this.date);
    d1.setDate(this.date.getDate() + 1);
    //this.date.setDate(this.date.getDate() + 1);
    // this.onDatePickerEvent.emit(d1);
    this.classService.updateDate(d1);
  }

  showMenu(): void {
    this.onMenuButtonClick.emit(null);
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
    this.dateControlsSubscription.unsubscribe();
    this.titleSubscription.unsubscribe();
  }
}
