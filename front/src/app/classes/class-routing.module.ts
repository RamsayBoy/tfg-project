import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClassComponent } from './pages/add-class/add-class.component';
import { ClassesComponent } from './pages/classes/classes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ClassesComponent },
      { path: 'add', component: AddClassComponent },
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
