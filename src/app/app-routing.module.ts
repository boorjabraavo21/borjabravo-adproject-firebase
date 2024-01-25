import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'player-info/:id',
    loadChildren: () => import('./pages/player-info/player-info.module').then( m => m.PlayerInfoPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'mysquads',
    loadChildren: () => import('./pages/mysquads/mysquads.module').then( m => m.MySquadsPageModule),
    canActivate:[AuthGuard, UserGuard]
  },
  {
    path: 'myplayers',
    loadChildren: () => import('./pages/myplayers/myplayers.module').then( m => m.MyplayersPageModule),
    canActivate:[AuthGuard, UserGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule),
    canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}