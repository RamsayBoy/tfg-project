import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MondayAsFirstDay } from './shared/dateAdapter/mondayAsFirstDay';
import { JwtTokenInterceptor } from './auth/interceptors/jwt-token.interceptor';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from './shared/shared.module';
import { BaseComponent } from './layouts/base/base.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { ClientsComponent } from './clients/pages/clients/clients.component';


@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LoginLayoutComponent,
    ClientsComponent,
    // IfRoleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatSidenavModule,
    SharedModule,
    MatListModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MondayAsFirstDay },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
