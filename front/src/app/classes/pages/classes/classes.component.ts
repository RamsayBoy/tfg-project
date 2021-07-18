import { Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  // TODO: Make interfaces shared between the backend and the frontend
  classes$!: Observable<Class[]>;
  isLoading$: Subject<boolean> = new Subject();

  dateSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private classService: ClassService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.dateSubscription = this.classService.currentDate.subscribe(date => {
      this.date = date;
      this.getClasses(this.date);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);  // TODO: In a constant
  }

  getClasses(date: Date): void {
    window.scroll(0, 0);
    this.classes$ = this.classService.getClasses(date);
    this.classes$.subscribe(
      data => {
        //this.areErrors = false;
        this.isLoading$.next(true);
      },
      error => {
        // Set the date to the previous date if there is an error
        //this.areErrors = true;
        this.isLoading$.next(false);
        this.dialogService.open('Error', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }
}
