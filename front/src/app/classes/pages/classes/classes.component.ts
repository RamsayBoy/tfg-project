import { Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import Class from 'src/interfaces/Class.interface';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit, OnDestroy {

  @Input() public date!: Date;
  lastDate: Date = new Date();
  // TODO: Make interfaces shared between the backend and the frontend
  public classes: Class[] = [];

  dateSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private classService: ClassService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    //this.getClasses(); -> It is call when datepicker is updated
    this.dateSubscription = this.classService.currentDate.subscribe(date => {
      this.lastDate = this.date;
      this.date = date;
      this.getClasses(this.date);
    });
    // this.updateDatePicked(this.date);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);  // TODO: In a constant
  }

  getClasses(date: Date): void {
    window.scroll(0, 0);
    this.classService.getClasses(date)
      .subscribe(
        data => {
          this.classes = data;
        },
        error => {
          // Set the date to the previous date if there is an error
          this.dialogService.open('Error', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }
}
