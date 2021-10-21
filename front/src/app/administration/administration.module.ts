import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdministrationComponent } from './pages/administration/administration.component';
import { AdministrationRoutingModule } from './administration-routing.module';



@NgModule({
  declarations: [
    AdministrationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
