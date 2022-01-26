import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public isPasswordVisible: Boolean = false;
  public loginForm: FormGroup = new FormGroup({});
  public loginErrorMessage: string = '';
  public isLoggingIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
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
        //Validators.minLength(6),
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
    this.isLoggingIn = true;
    this.authService.login(this.loginForm.value)
      .subscribe(
        _ => {
          let params = this.route.snapshot.queryParams;

          if (params['redirectURL']) {
              this.router.navigate([ params['redirectURL'] ])
                .catch(() => this.router.navigate([this.authService.redirectUrl]));
          }
          else {
            this.router.navigate([this.authService.redirectUrl]);
          }
        },
        error => {
          // TODO: Create a handler that shows a pop up
          this.loginErrorMessage = error;
        },
      )
      .add(() => this.isLoggingIn = false);
  }

  ngOnDestroy(): void {
    // TODO: unsubscribe() this.authService.login ???
  }
}
