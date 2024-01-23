import { NgModule } from '@angular/core';

import { MySquadsPage } from './mysquads.page';
import { MySquadsPageRoutingModule } from './mysquads-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    MySquadsPageRoutingModule
  ],
  declarations: [MySquadsPage]
})
export class MySquadsPageModule {}
