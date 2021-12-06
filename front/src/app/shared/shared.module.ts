import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/components/dialog/dialog.component';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmDialogComponent } from './dialog/components/confirmDialog/confirm-dialog.component';
import { IfRoleDirective } from './directives/if-role.directive';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [
    ToolbarComponent,
    DialogComponent,
    LoaderComponent,
    ConfirmDialogComponent,
    IfRoleDirective,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule,
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDatepickerModule,
    ToolbarComponent,
    DialogComponent,
    LoaderComponent,
    IfRoleDirective,
    MatTabsModule,
    MatMenuModule,
  ],
})
export class SharedModule { }
