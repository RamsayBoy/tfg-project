import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClientsRegisterComponent } from './pages/clients-register/clients-register.component';


@NgModule({
  declarations: [
    ClientsRegisterComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
  ]
})
export class ClientModule { }
