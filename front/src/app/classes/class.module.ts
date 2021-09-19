import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesComponent } from './pages/classes/classes.component';
import { ClassRoutingModule } from './class-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClassComponent } from './components/class/class.component';
import { AddClassComponent } from './pages/add-class/add-class.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClassesComponent,
    ClassComponent,
    AddClassComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ClassRoutingModule,
    SharedModule,
    TextMaskModule,
    ReactiveFormsModule,
  ]
})
export class ClassModule { }
