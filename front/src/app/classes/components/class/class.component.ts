import { Component, Input, OnInit } from '@angular/core';
import Class from 'src/interfaces/Class.interface';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  @Input('class') public class!: Class;
  public durationPeriod!: string;

  constructor() { }

  ngOnInit(): void {
    // Done here for avoiding errors
    this.durationPeriod = this.getDurationPeriod();
  }

  getDurationPeriod() {
    let date = this.class.date;
    let secondsToEnd = this.getSecondsFromTime(this.class.duration);
    let endDate = date;

    let startHour = date.getHours();
    let startMinutes = date.getMinutes();

    endDate.setSeconds(date.getSeconds() + secondsToEnd);

    let endHour = endDate.getHours();
    let endMinutes = endDate.getMinutes();

    return `${startHour}:${startMinutes} - ${endHour}:${endMinutes}`;
  }

  getSecondsFromTime(time: string) {
    let parts = time.split(':');
    return (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]);
  }
}
