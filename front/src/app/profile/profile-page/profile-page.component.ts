import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LoaderService } from 'src/app/shared/loader/services/loader.service';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';

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
  ) { }

  ngOnInit(): void {
    this.toolbarService.updateTitle("Perfil")
    // this.toolbarService.showClientsTabs(false);
    // this.toolbarService.showDateControls(false);

    this.editProfileInfoFormGroup = this.formBuilder.group({
      name: ['', [
        Validators.maxLength(16),
      ]],
      lastName: ['', [
        Validators.maxLength(32),
      ]],
      email: ['', [
        Validators.email,
        Validators.maxLength(256),
      ]],
      password: ['', []],
      newPassword: ['', [
        Validators.minLength(6)
      ]]
    });
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
