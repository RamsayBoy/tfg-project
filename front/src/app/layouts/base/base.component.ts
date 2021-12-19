import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import User from 'src/interfaces/User.interface';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  opened = false;
  mobileQuery!: MediaQueryList;
  private _mobileQueryListener!: () => void;

  username: string = "Usuario";
  profileImg: string = environment.defaultProfileImagePath;

  currentUser!: User;

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
    this.authService.getUserInfo()
      .subscribe({
        next: (userInfo) => {
          if (userInfo.name) {
            this.username = userInfo.name;

            if (userInfo.email) {
              this.username += ' ' + userInfo.lastName;
            }
          }
          else {
            this.username = userInfo.email;
          }
        },
        error: (error) => {
          this.username = 'Usuario';
        },
      });
  }

  showMenu(): void {
    this.opened = true;
  }

  logout(): void {
    this.opened = false;
    this.authService.logout();
  }

  getUsernameToDisplay(): string {
    let nameToDisplay: string = 'Usuario';
    return nameToDisplay;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
