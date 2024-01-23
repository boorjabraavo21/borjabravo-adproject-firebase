import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayerComponent } from 'src/app/components/player-components/player/player.component';
import { PlayerDetailComponent } from 'src/app/components/player-components/player-detail/player-detail.component';
import { PlayerSearcherComponent } from 'src/app/components/player-components/player-searcher/player-searcher.component';
import { PlayerItemComponent } from 'src/app/components/player-components/player-item/player-item.component';
import { SquadFormComponent } from 'src/app/components/squad-components/squad-form/squad-form.component';
import { PlayerFormComponent } from 'src/app/components/player-components/player-form/player-form.component';
import { RouterModule } from '@angular/router';
import { SquadComponent } from '../components/squad-components/squad/squad.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { PlayerCardComponent } from '../components/player-components/player-card/player-card.component';
import { HeaderComponent } from '../components/header/header.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../services/custom-translate.service';
import { HttpClient } from '@angular/common/http';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { CreatedPipe } from '../pipes/created.pipe';
import { OriginalPlayerPipe } from '../pipes/original-player.pipe';
import { PictureSelectableComponent } from '../components/picture-selectable/picture-selectable.component';
import { HighlightDirective } from '../directives/highlight.directive';

@NgModule({
  declarations: [ SquadFormComponent, SquadComponent, LoginFormComponent, PlayerCardComponent, 
    PlayerComponent, PlayerDetailComponent, PlayerFormComponent, PlayerItemComponent, PlayerSearcherComponent,
     HeaderComponent, RegisterFormComponent, CreatedPipe, OriginalPlayerPipe, PictureSelectableComponent, HighlightDirective],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    RouterModule, TranslateModule, SquadFormComponent, SquadComponent, LoginFormComponent, PlayerCardComponent, 
    PlayerComponent, PlayerDetailComponent, PlayerFormComponent, PlayerItemComponent,
     PlayerSearcherComponent, HeaderComponent, RegisterFormComponent, CreatedPipe, 
     OriginalPlayerPipe, PictureSelectableComponent, HighlightDirective]
})
export class SharedModule { }
