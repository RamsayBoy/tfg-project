import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LoaderService } from 'src/app/shared/loader/services/loader.service';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';
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

  public timemask = [/\d/, /\d/, ':', /\d/, /\d/];

  public addClassForm: FormGroup = new FormGroup({});

  constructor(
    private toolbar: ToolbarService,
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
    // This for new page, not pop-up
    // this.toolbar.updateTitle("Añadir clase");
    // this.toolbar.showDateControls(false);

    // TODO: Take the hours and minutes from this.class.duration
    //  and set them into time input

    this.isEditMode = this.data.class.id > 0;
    this.title = this.isEditMode ? "Editar clase" : "Añadir clase";
    this.confirmBtnText = this.isEditMode ? "Actualizar" : "Añadir";

    this.addClassForm = this.formBuilder.group({
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

    let classToPost: Class = this.addClassForm.value;

    this.classService.addOrEditClass(classToPost)
      .subscribe({
        next: () => {
          this.dialogRef.close();
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
