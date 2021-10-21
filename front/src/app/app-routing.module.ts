import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule),
  },
  {
    path: 'classes',
    loadChildren: () => import('./classes/class.module').then(module => module.ClassModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'administration',
    loadChildren: () => import('./administration/administration.module').then(module => module.AdministrationModule),
    /* TODO: Add an AdminGuard (only admin can get access) */
    canActivate: [AuthGuard]
  },
  {
    // TODO: Not found page
    path: '**',
    redirectTo: 'auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})], // useHash for avoiding conflicts with api and angular routes
  exports: [RouterModule],
})
export class AppRoutingModule { }
