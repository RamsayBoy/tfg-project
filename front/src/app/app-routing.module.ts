import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ClassesComponent } from './classes/pages/classes/classes.component';

const routes: Routes = [
  {
    path: 'auth',
    // Auth module lazy load
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule),
  },
  {
    path: 'classes',
    component: ClassesComponent,
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
