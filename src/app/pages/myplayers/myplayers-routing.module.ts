import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyplayersPage } from './myplayers.page';

const routes: Routes = [
  {
    path: '',
    component: MyplayersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyplayersPageRoutingModule {}
