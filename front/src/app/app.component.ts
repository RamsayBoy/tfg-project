import { Input, OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import User from 'src/interfaces/User.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  opened = false;
  mobileQuery!: MediaQueryList;
  private _mobileQueryListener!: () => void;

  username$: Observable<string> = of("Usuario");
  profileImg: string = environment.defaultProfileImagePath;

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
  }
}
