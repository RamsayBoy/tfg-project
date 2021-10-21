import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  opened = false;
  mobileQuery!: MediaQueryList;
  private _mobileQueryListener!: () => void;

  username$: Observable<string> = of("Usuario");
  profileImg: string = "/assets/default-profile-img.png";
  isUserLoggedIn: boolean = false;
  isUserLoggedInSubscription!: Subscription;

  @Input() toolbarTitle: string = "";
  @Input() showToolbarDateControls: boolean = false;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 640px)');
    this._mobileQueryListener = () => {
      // Close menu when change from desktop to mobile
      if (this.mobileQuery.matches) {
        this.opened = false;
      }
      else {
        this.opened = true;
      }
      return changeDetectorRef.detectChanges();
    }
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.isUserLoggedInSubscription = this.authService.isUserLoggingInCurrentValue.subscribe(
      loggedIn => {
        this.isUserLoggedIn = loggedIn;
        if (loggedIn) {
          this.username$ = this.authService.getUsername();
          // TODO: Get the profile image
        }
      });
  }

  showMenu(): void {
    this.opened = true;
  }

  logout(): void {
    this.opened = false;
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.isUserLoggedInSubscription.unsubscribe();
  }
}
