import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isPasswordVisible: Boolean = false;
  public loginForm: FormGroup = new FormGroup({});
  public loginErrorMessage: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        // TODO: Use Validators.pattern('SOME_PATTERN') for security reasons
      ]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    this._authService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.loginErrorMessage = '';
          this._authService.setTokenInLocalStorageFrom(response);
        },
        error: (errorResponse) => {
          this.loginErrorMessage = errorResponse.error.message;
        }
      });
  }
}
