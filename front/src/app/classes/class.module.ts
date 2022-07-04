import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesComponent } from './pages/classes/classes.component';
import { ClassRoutingModule } from './class-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClassComponent } from './components/class/class.component';
import { AddClassComponent } from './pages/add-class/add-class.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MondayAsFirstDay } from '../shared/dateAdapter/mondayAsFirstDay';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';



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
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MondayAsFirstDay },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ]
})
export class ClassModule { }
