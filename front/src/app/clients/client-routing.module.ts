import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '../layouts/base/base.component';
import { ClientsRegisterComponent } from './pages/clients-register/clients-register.component';
import { ClientsComponent } from './pages/clients/clients.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', component: ClientsComponent },
      { path: 'register', component: ClientsRegisterComponent },
      // TODO: See if this gives me problem when create a not found page
      { path: '**', redirectTo: '' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }