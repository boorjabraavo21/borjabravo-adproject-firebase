import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MySquadsPage } from './mysquads.page';


const routes: Routes = [
  {
    path: '',
    component: MySquadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySquadsPageRoutingModule {}
