import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { IsAdminGuard } from './auth/guards/isAdmin.guard';
import { BaseComponent } from './layouts/base/base.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule),
      },
    ]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'classes',
        loadChildren: () => import('./classes/class.module').then(module => module.ClassModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/client.module').then(module => module.ClientModule),
        canActivate: [AuthGuard, IsAdminGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(module => module.ProfileModule),
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'administration',
      //   loadChildren: () => import('./administration/administration.module').then(module => module.AdministrationModule),
      //   canActivate: [AuthGuard, IsAdminGuard]
      // },
    ]
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
