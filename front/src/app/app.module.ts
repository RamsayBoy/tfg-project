import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  /* What happen if I do not add authservice, for example, here?
    I can use it because of the router.
    There are problems with instances of authService? Is singleton, it is not?
    ...*/
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
