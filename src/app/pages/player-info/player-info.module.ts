import { NgModule } from '@angular/core';

import { PlayerInfoPageRoutingModule } from './player-info-routing.module';

import { PlayerInfoPage } from './player-info.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    PlayerInfoPageRoutingModule
  ],
  declarations: [PlayerInfoPage]
})
export class PlayerInfoPageModule {}
