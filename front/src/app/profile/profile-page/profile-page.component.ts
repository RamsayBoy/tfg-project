import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LoaderService } from 'src/app/shared/loader/services/loader.service';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/users/user.service';
import User from 'src/interfaces/User.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css', '../../shared/styles/ProfileRegisterStyles.css']
})
export class ProfilePageComponent implements OnInit {

  private user!: User;
  public fullname: string = "Usuario";

  public editProfileInfoFormGroup: FormGroup = new FormGroup({});
  public changePasswordFormGroup: FormGroup = new FormGroup({});

  public isPasswordVisible: boolean = false;
  public isNewPasswordVisible: boolean = false;

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private authService: AuthService,
    private userService: UserService,
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
        Validators.required,
        Validators.email,
        Validators.maxLength(256),
      ]]
    });

    this.changePasswordFormGroup = this.formBuilder.group({
      password: ["", []],
      newPassword: ["", [
        Validators.minLength(6)
      ]]
    });

    this.authService.getUserInfo()
      .subscribe(
        data => {
          this.fillEditProfileFormFields(data);
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

  fillEditProfileFormFields(user: User) {
    this.user = user;
    this.fullname = this.authService.getUsernameByUser(user);
    this.editProfileInfoFormGroup.get("name")?.setValue(user.name);
    this.editProfileInfoFormGroup.get("lastName")?.setValue(user.lastName);
    this.editProfileInfoFormGroup.get("email")?.setValue(user.email);
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
    return this.changePasswordFormGroup.get('password');
  }

  get newPassword() {
    return this.changePasswordFormGroup.get('newPassword');
  }

  onSubmit() {
    this.loaderService.setLoader(true);

    // Create a user for updating the current
    let user: User = this.user;
    user.email = this.email?.value;
    user.name = this.name?.value;
    user.lastName = this.lastName?.value;

    this.userService.updateUserInfo(user)
      .subscribe(
        data => {
          if (data) {
            let user: User = data.data;
            if (user) {
              this.fillEditProfileFormFields(user);
            }
          }

          this.loaderService.setLoader(false);
        },
        error => {
          this.loaderService.setLoader(false);
          this.dialogService.open('Error', error);
        },
      );
  }

  onSubmitChangePassword() {
      this.loaderService.setLoader(true);

      this.userService.changePassword(this.user.id, this.newPassword?.value)
        .subscribe(
          data => {
            this.loaderService.setLoader(false);
          },
          error => {
            this.loaderService.setLoader(false);
            this.dialogService.open('Error', error);
          },
        );
    }

}
