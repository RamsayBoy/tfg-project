import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';
import Class from 'src/interfaces/Class.interface';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  public title!: string;
  private isEditMode: boolean = false;

  public timemask = [/\d/, /\d/, ':', /\d/, /\d/];

  public addClassForm: FormGroup = new FormGroup({});

  constructor(
    private toolbar: ToolbarService,
    @Inject(MAT_DIALOG_DATA) public data: {
      class: Class,
    },
  ) { }

  ngOnInit(): void {
    // This for new page, not pop-up
    // this.toolbar.updateTitle("Añadir clase");
    // this.toolbar.showDateControls(false);

    // TODO: Take the hours and minutes from this.class.duration
    //  and set them into time input

    this.isEditMode = this.data.class.id > 0;

    if (this.isEditMode) {
      this.title = "Editar clase";
    }
    else {
      this.title = "Añadir clase";
    }
  }

  onSubmit(): void {
    // this.isLoggingIn = true;
    // this.authService.login(this.loginForm.value)
    //   .subscribe(
    //     _ => {
    //       this.router.navigate([this.authService.redirectUrl]);
    //     },
    //     error => {
    //       // TODO: Create a handler that shows a pop up
    //       this.loginErrorMessage = error;
    //     },
    //   )
    //   .add(() => this.isLoggingIn = false);
  }

}
