import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LoaderService } from 'src/app/shared/loader/services/loader.service';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';

@Component({
  selector: 'app-clients-register',
  templateUrl: './clients-register.component.html',
  styleUrls: ['./clients-register.component.css']
})
export class ClientsRegisterComponent implements OnInit {

  public registerUserFormGroup: FormGroup = new FormGroup({});

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private authService: AuthService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.toolbarService.updateTitle("Alumnos");
    this.toolbarService.showClientsTabs(true);

    this.registerUserFormGroup = this.formBuilder.group({
      name: ['', [
        Validators.maxLength(16),
      ]],
      lastName: ['', [
        Validators.maxLength(32),
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(256),
      ]],
    });
  }

  get name() {
    return this.registerUserFormGroup.get('name');
  }

  get lastName() {
    return this.registerUserFormGroup.get('lastName');
  }

  get email() {
    return this.registerUserFormGroup.get('email');
  }

  onSubmit() {
    this.loaderService.setLoader(true);

    this.authService.register(this.registerUserFormGroup.value)
      .subscribe(
        data => {
          this.loaderService.setLoader(false);
          this.dialogService.open('Usuario registrado con éxito', data.message);
        },
        error => {
          this.loaderService.setLoader(false);
          this.dialogService.open('Error', error);
        },
      );
  }

  ngOnDestroy(): void {
    this.toolbarService.showClientsTabs(false);
  }

}
