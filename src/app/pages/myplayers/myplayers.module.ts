import { NgModule } from '@angular/core';

import { MyplayersPageRoutingModule } from './myplayers-routing.module';

import { MyplayersPage } from './myplayers.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    MyplayersPageRoutingModule
  ],
  declarations: [MyplayersPage]
})
export class MyplayersPageModule {}
