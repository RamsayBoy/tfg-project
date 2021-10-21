import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from '../layouts/login-layout/login-layout.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'login' },
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class AuthRoutingModule { }
