import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesComponent } from './pages/classes/classes.component';
import { ClassRoutingModule } from './class-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClassComponent } from './components/class/class.component';
import { AddClassComponent } from './pages/add-class/add-class.component';



@NgModule({
  declarations: [
    ClassesComponent,
    ClassComponent,
    AddClassComponent,
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    SharedModule,
  ]
})
export class ClassModule { }
