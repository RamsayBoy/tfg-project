import { Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import Class from 'src/interfaces/Class.interface';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  @Input() public date!: Date;
  // TODO: Make interfaces shared between the backend and the frontend
  public classes: Class[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private classService: ClassService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    //this.getClasses(); -> It is call when datepicker is updated
    this.date = new Date();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);  // TODO: In a constant
  }

  updateDatePicked(date: Date) {
    //this.date = date;
    // TODO: Make date be the last one if connection fails
    this.getClasses(date);
    window.scroll(0, 0);
  }

  getClasses(date: Date): void {
    this.classService.getClasses(date)
      .subscribe(
        data => {
          this.date = date;
          this.classes = data;
        },
        error => {
          this.dialogService.open('Error', error);
        }
      );
  }
}
