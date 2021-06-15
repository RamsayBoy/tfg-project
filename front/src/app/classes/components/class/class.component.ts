import { Component, Input, OnInit } from '@angular/core';
import Class from 'src/interfaces/Class.interface';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  @Input('class') public class!: Class;

  constructor() { }

  ngOnInit(): void {
  }

  get durationPeriod() {
    console.log(this.class)
    console.log(typeof(this.class.date))
    console.log(new Date(this.class.date))
    let startHour = this.class.date.getHours();
    let startMinutes = this.class.date.getMinutes();

    let endHour = this.class.date.getHours();
    let endMinutes = this.class.date.getMinutes();

    return `${startHour}:${startMinutes} - ${endHour}:${endMinutes}`;
  }

}
