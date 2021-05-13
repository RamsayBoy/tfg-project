import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesComponent } from './pages/classes/classes.component';
import { ClassRoutingModule } from './class-routing.module';



@NgModule({
  declarations: [
    ClassesComponent,
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
  ]
})
export class ClassModule { }
