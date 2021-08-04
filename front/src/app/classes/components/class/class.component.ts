import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LoaderService } from 'src/app/shared/loader/services/loader.service';
import Class from 'src/interfaces/Class.interface';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  @Input('class') public class!: Class;
  public durationPeriod!: string;

  constructor(
    private classService: ClassService,
    private dialogService: DialogService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    // Done here for avoiding errors
    this.durationPeriod = this.getDurationPeriod();
  }

  getDurationPeriod() {
    let date = this.class.date;
    let secondsToEnd = this.getSecondsFromTime(this.class.duration);
    let endDate = date;

    let startHour = date.getHours().toString();
    startHour = ("0" + startHour).slice(-2);

    let startMinutes = date.getMinutes().toString();
    startMinutes = ("0" + startMinutes).slice(-2);

    endDate.setSeconds(date.getSeconds() + secondsToEnd);

    let endHour = endDate.getHours().toString();
    endHour = ("0" + endHour).slice(-2);

    let endMinutes = endDate.getMinutes().toString();
    endMinutes = ("0" + endMinutes).slice(-2);

    return `${startHour}:${startMinutes} - ${endHour}:${endMinutes}`;
  }

  getSecondsFromTime(time: string) {
    let parts = time.split(':');
    return (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]);
  }

  joinClass() {
    this.loaderService.setLoader(true);
    this.classService.joinClass(this.class.id).subscribe({
      next: () => {
        this.class.isUserJoined = true;
        this.loaderService.setLoader(false);
      },
      error: (error) => {
        this.dialogService.open('Error', error)
      },
    });
  }

  removeFromClass() {
    this.loaderService.setLoader(true);
    this.classService.removeFromClass(this.class.id).subscribe({
      next: () => {
        this.class.isUserJoined = false;
        this.loaderService.setLoader(false);
      },
      error: (error) => {
        this.dialogService.open('Error', error)
      },
    });
  }
}
