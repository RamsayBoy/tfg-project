import { Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  @Input() private date!: Date;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  showMeYOurDate(){
    console.log(this.date);
  }

  ngOnInit(): void { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);  // TODO: In a constant
  }

  updateDatePicked(date: Date) {
    this.date = date;
  }
}
