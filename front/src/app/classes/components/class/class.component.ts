import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LoaderService } from 'src/app/shared/loader/services/loader.service';
import Class from 'src/interfaces/Class.interface';
import Client from 'src/interfaces/Clients.interface';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  @Input('class') public class!: Class;
  public durationPeriod!: string;

  @Output() classDeleted: EventEmitter<number> = new EventEmitter();

  constructor(
    private classService: ClassService,
    private dialogService: DialogService,
    private loaderService: LoaderService,
    public dialog: MatDialog,
    private authService: AuthService,
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

        // TODO: Make a singleton for contain the user info and added here.
        this.class.usersJoined.push(this.authService.currentUser);
        this.loaderService.setLoader(false);
      },
      error: (error) => {
        this.dialogService.open('Error', error)
      },
    });
  }

  removeFromClassDialog() {
    this.dialogService.openConfirm(
      "Desapuntarse de la clase",
      "¿Desea desapuntarse de la clase?",
      "No",
      "Sí"
    )
    .afterClosed()
    .subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.removeFromClass();
      }
    });
  }

  removeFromClass() {
    this.loaderService.setLoader(true);
    this.classService.removeFromClass(this.class.id).subscribe({
      next: () => {
        this.class.isUserJoined = false;

        const userIndex = this.class.usersJoined
          .findIndex(user => user.id === this.authService.currentUser.id);

        this.class.usersJoined.splice(userIndex, 1);

        this.loaderService.setLoader(false);
      },
      error: (error) => {
        this.dialogService.open('Error', error)
      },
    });
  }

  deleteClassDialog() {
    this.dialogService.openConfirm(
      "¿Desea eliminar la clase?",
      "Si borra la clase todos los alumnos apuntados dejarán de estarlo.",
      "No",
      "Sí"
    )
    .afterClosed()
    .subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteClass();
      }
    });
  }

  deleteClass(): void {
    this.loaderService.setLoader(true);
    this.classService.removeClass(this.class.id).subscribe({
      next: () => {
        this.classDeleted.emit(this.class.id);
        this.loaderService.setLoader(false);
      },
      error: (error) => {
        this.dialogService.open('Error', error)
      },
    });
  }
}
