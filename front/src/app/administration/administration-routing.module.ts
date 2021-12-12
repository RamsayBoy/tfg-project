import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '../layouts/base/base.component';
import { AdministrationComponent } from './pages/administration/administration.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AdministrationComponent },
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
export class AdministrationRoutingModule { }
