import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LoaderService } from 'src/app/shared/loader/services/loader.service';
import Class from 'src/interfaces/Class.interface';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  private isEditMode: boolean = false;

  public title!: string;
  public confirmBtnText!: string;

  // public timemask = [/\d/, /\d/, ':', /\d/, /\d/];

  public addClassForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      class: Class,
    },
    private formBuilder: FormBuilder,
    private classService: ClassService,
    private dialogRef: MatDialogRef<AddClassComponent>,
    private dialogService: DialogService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.data.class.id > 0;
    this.title = this.isEditMode ? "Editar clase" : "Añadir clase";
    this.confirmBtnText = this.isEditMode ? "Actualizar" : "Añadir";

    this.addClassForm = this.formBuilder.group({
      // For editing the class, the '00:00' value must be edited and got
      //  from this.data.class.date (getting the hours, minutes and seconds)
      startTime: ['00:00', [
        Validators.required,
      ]],
      duration: [this.getHoursAndMinutes(this.data.class.duration), [
      Validators.required,
      ]],
      date: [this.data.class.date, [
        Validators.required,
      ]],
      numClientsMax: [0, [
        Validators.required,
        Validators.pattern("^[1-9][0-9]*$"),  // Min 1 person
      ]],
    });
  }

  getHoursAndMinutes(time: string): string {
    let splitedTime = time.split(":");
    const hoursAndMinutes = splitedTime[1] + ":" + splitedTime[2];
    return hoursAndMinutes;
  }

  get startTime() {
    return this.addClassForm.get('startTime');
  }

  get duration() {
    return this.addClassForm.get('duration');
  }

  get date() {
    return this.addClassForm.get('date');
  }

  get numClientsMax() {
    return this.addClassForm.get('numClientsMax');
  }

  onSubmit(): void {
    this.loaderService.setLoader(true);

    // TODO: Check if duration is more than 8 hours for showing a warning
    // TODO: Check if the initial and end hour are not between a reasonable time for showing a warning

    let classToPost: Class = {
      id: this.data.class.id,
      date: new Date(this.addClassForm.value.date),
      duration: this.addClassForm.value.duration + ":00",
      numMaxClients: this.addClassForm.value.numClientsMax,
      teacherId: this.data.class.teacherId,
      usersJoined: [],
      isUserJoined: false
    };

    // Set start time to date (in database is a datetime)
    const startTime: string = this.addClassForm.value.startTime + ":00";
    const startTimeParts: string[] = startTime.split(":");

    // If I do not use an auxiliary variable, minutes and seconds are not
    //  set properly
    let auxDate = classToPost.date;

    // Add class start time to the date
    auxDate.setHours(Number(startTimeParts[0]));
    auxDate.setMinutes(Number(startTimeParts[1]));
    auxDate.setSeconds(Number(startTimeParts[2]));

    classToPost.date = auxDate;

    this.classService.addOrEditClass(classToPost)
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.classService.getClasses(classToPost.date).subscribe();
        },
        error: (error) => {
          this.dialogService.open('Error', error);
        },
      })
      .add(() => {
        this.loaderService.setLoader(false)
      });
  }

}
