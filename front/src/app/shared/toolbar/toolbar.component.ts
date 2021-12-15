import { ChangeDetectorRef, OnDestroy, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
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
  @Input('showClientsTabs') showClientsTabs: boolean = false;
  @Output() onMenuButtonClick: EventEmitter<any> = new EventEmitter();

  dateSubscription!: Subscription;
  titleSubscription!: Subscription;
  dateControlsSubscription!: Subscription;
  clientsTabsSubscription!: Subscription;

  tabActive: number = 0;

  constructor(
    private classService: ClassService,
    private toolbarService: ToolbarService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.changeDetectorRef.detach();
    this.dateControlsSubscription = this.toolbarService.areDateControlsShown.subscribe(areShown => {
      this.showDateControls = areShown;
      this.changeDetectorRef.detectChanges();
    });
    this.clientsTabsSubscription = this.toolbarService.areClientsTabsShown.subscribe(areShown => {
      this.showClientsTabs = areShown;

      if (this.router.url === '/clients/register') {
        this.tabActive = 1;
      }
      else {
        this.tabActive = 0;
      }

      this.changeDetectorRef.detectChanges();
    });

    this.titleSubscription = this.toolbarService.currentTitle.subscribe(title => {
      this.title = title;
      this.changeDetectorRef.detectChanges();
    });
    this.dateSubscription = this.classService.currentDate.subscribe(date => {
      this.date = date;
      this.changeDetectorRef.detectChanges();
    });
    this.changeDetectorRef.reattach();
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

  activeTab(tabNumber: number): void {
    this.tabActive = tabNumber;

    if (tabNumber === 0) {
      this.router.navigate(['clients'])
    }

    if (tabNumber === 1) {
      this.router.navigate(['clients/register'])
    }
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
    this.dateControlsSubscription.unsubscribe();
    this.clientsTabsSubscription.unsubscribe();
    this.titleSubscription.unsubscribe();
  }
}
