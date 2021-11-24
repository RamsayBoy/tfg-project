import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LoaderService } from 'src/app/shared/loader/services/loader.service';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  public myClientsForm: FormGroup = new FormGroup({});
  public newClientForm: FormGroup = new FormGroup({});
  public configurationsForm: FormGroup = new FormGroup({});

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialogService: DialogService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.toolbarService.updateTitle("Administración");

    this.newClientForm = this.formBuilder.group({
      email: ['', [
        // Validators.required,
        Validators.email,
      ]],
    });
  }

  get email() {
    return this.newClientForm.get('email');
  }

  onSubmitRegister(): void {
    const email: string = this.newClientForm.value.email;

    if (email) {
      this.loaderService.setLoader(true);

      this.authService.register(email)
        .subscribe({
          next: (data) => {
            this.dialogService.open('Usuario registrado', data.message);
          },
          error: (error) => {
            this.dialogService.open('Error', error);
          },
        })
        .add(() => {
          this.loaderService.setLoader(false);
        });
    }
  }

}
