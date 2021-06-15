import { Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Class from 'src/interfaces/Class.interface';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  @Input() private date!: Date;
  // TODO: Make interfaces shared between the backend and the frontend
  public classes: Class[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private classService: ClassService,
  ) { }

  // TODO: Remove this method
  showMeYOurDate(){
    console.log(this.date);
  }

  ngOnInit(): void {
    this.getClasses();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);  // TODO: In a constant
  }

  updateDatePicked(date: Date) {
    this.date = date;
  }

  getClasses(): void {
    this.classService.getClasses()
      .subscribe(
        data => {
          console.log('data', data);
          this.classes = data;
        },
        error => console.log('Pop-up with:', error),
      );
  }
}
