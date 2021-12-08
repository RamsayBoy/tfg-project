import { Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';
import Class from 'src/interfaces/Class.interface';
import { ClassService } from '../../services/class.service';
import { AddClassComponent } from '../add-class/add-class.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit, OnDestroy {

  @Input() public date!: Date;
  // TODO: Make interfaces shared between the backend and the frontend
  classes$!: Observable<Class[]>;
  thereIsAnError$: Subject<boolean> = new Subject<boolean>();

  dateSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private classService: ClassService,
    private dialogService: DialogService,
    public dialog: MatDialog,
    private toolbarService: ToolbarService,
  ) { }

  ngOnInit(): void {
    this.dateSubscription = this.classService.currentDate.subscribe(date => {
      this.date = date;
      this.getClasses(this.date);
    });

    this.toolbarService.updateTitle("Clases");
    this.toolbarService.showDateControls(true);
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
        this.thereIsAnError$.next(false);
      },
      error => {
        // Set the date to the previous date if there is an error
        //this.areErrors = true;
        this.thereIsAnError$.next(true);
        this.dialogService.open('Error', error);
      }
    );
  }

  removeClass(classId: number) {
    this.classes$ = this.classes$.pipe(
      map(classes => classes.filter(currentClass => currentClass.id !== classId)),
    );
  }

  addClassDialog() {
    this.dialog.open(AddClassComponent, {
      width: '21rem',
      data: {
        class: {
          id: -1,
          date: this.date,
          duration: '00:00:00',
          numMaxClients: 0,
          teacherId: 0,
          usersJoined: [],
          isUserJoined: false
        },
      }
    })
    .afterClosed().subscribe(
      data => {
        // TODO: If modal is closed by clicking outside, data is also undefined
        //  and classes are reloaded
        // Update classes if button pressed was "Añadir" and not "Cancelar"
        if(data === undefined) {
          this.getClasses(this.date);
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
    this.toolbarService.showDateControls(false);
  }
}
