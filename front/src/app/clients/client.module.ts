import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClientsRegisterComponent } from './pages/clients-register/clients-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsComponent } from './pages/clients/clients.component';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientsRegisterComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
