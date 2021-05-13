import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './pages/classes/classes.component';

const routes: Routes = [
  {
    path: '',
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
