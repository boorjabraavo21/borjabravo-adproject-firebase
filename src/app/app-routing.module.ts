import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'player-info/:id',
    loadChildren: () => import('./pages/player-info/player-info.module').then( m => m.PlayerInfoPageModule)
  },
  {
    path: 'mysquads',
    loadChildren: () => import('./pages/mysquads/mysquads.module').then( m => m.MySquadsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'myplayers',
    loadChildren: () => import('./pages/myplayers/myplayers.module').then( m => m.MyplayersPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}