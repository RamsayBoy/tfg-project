import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLogginIn()) {
      this.router.navigate([this.authService.redirectUrl]);
    }

    this.loginForm = this.formBuilder.group({
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
    this.authService.login(this.loginForm.value).subscribe(
      _ => this.router.navigate([this.authService.redirectUrl]),
      failedResponse => this.loginErrorMessage = failedResponse.error.message,
    );
  }
}
