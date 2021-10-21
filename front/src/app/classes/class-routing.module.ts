import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '../layouts/base/base.component';
import { ClassesComponent } from './pages/classes/classes.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', component: ClassesComponent },
      // TODO: See if this gives me problem when create a not found page
      { path: '**', redirectTo: '' },
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class ClassRoutingModule { }
