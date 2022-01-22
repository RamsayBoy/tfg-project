import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LoaderService } from 'src/app/shared/loader/services/loader.service';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css', '../../shared/styles/ProfileRegisterStyles.css']
})
export class ProfilePageComponent implements OnInit {

  public editProfileInfoFormGroup: FormGroup = new FormGroup({});
  public isPasswordVisible: boolean = false;
  public isNewPasswordVisible: boolean = false;

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.toolbarService.updateTitle("Perfil")
    // this.toolbarService.showClientsTabs(false);
    // this.toolbarService.showDateControls(false);

    this.editProfileInfoFormGroup = this.formBuilder.group({
      name: ["", [
        Validators.maxLength(16),
      ]],
      lastName: ["", [
        Validators.maxLength(32),
      ]],
      email: ["", [
        Validators.email,
        Validators.maxLength(256),
      ]],
      password: ["", []],
      newPassword: ["", [
        Validators.minLength(6)
      ]]
    });

    this.authService.getUserInfo()
      .subscribe(
        data => {
          this.editProfileInfoFormGroup.get("name")?.setValue(data.name);
          this.editProfileInfoFormGroup.get("lastName")?.setValue(data.lastName);
          this.editProfileInfoFormGroup.get("email")?.setValue(data.email);
        },
        error => {
          this._snackBar.open(error, undefined, {
            duration: 3*1000, // 3 seconds
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      );
  }

  get name() {
    return this.editProfileInfoFormGroup.get('name');
  }

  get lastName() {
    return this.editProfileInfoFormGroup.get('lastName');
  }

  get email() {
    return this.editProfileInfoFormGroup.get('email');
  }

  get password() {
    return this.editProfileInfoFormGroup.get('password');
  }

  get newPassword() {
    return this.editProfileInfoFormGroup.get('newPassword');
  }

  onSubmit() {
    // this.loaderService.setLoader(true);
    //
    // this.authService.register(this.registerUserFormGroup.value)
    //   .subscribe(
    //     data => {
    //       this.loaderService.setLoader(false);
    //       this.dialogService
    //         .open('Usuario registrado con éxito', data.message)
    //         .afterClosed()
    //         .subscribe({
    //           next: () => this.router.navigateByUrl('/clients'),
    //         });
    //     },
    //     error => {
    //       this.loaderService.setLoader(false);
    //       this.dialogService.open('Error', error);
    //     },
    //   );
  }

}
