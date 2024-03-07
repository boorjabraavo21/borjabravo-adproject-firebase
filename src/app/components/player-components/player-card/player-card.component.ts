import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Player } from 'src/app/interfaces/player';
import { PlayerSearcherComponent } from '../player-searcher/player-searcher.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const PLAYER_CARD_VALUE_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PlayerCardComponent),
  multi: true
}

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  providers: [PLAYER_CARD_VALUE_ACCESOR]
})
export class PlayerCardComponent  implements OnInit, ControlValueAccessor {

  @Input() player: Player | null = null
  @Input() pAdded:Player[] = []
  @Output() onPlayerSelected = new EventEmitter()
  onChange?:(obj: any) => void
  disable:boolean = false
  constructor(
    private popover:PopoverController
  ) { }

  writeValue(obj: any): void {
    this.player = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled
  }

  ngOnInit() {}

  async presentSelector() {
    const popover = await this.popover.create({
      component:PlayerSearcherComponent,
      componentProps:{
        player:this.player,
        playersSelected:this.pAdded
      },
    })
    popover.present()
    const { data, role } = await popover.onDidDismiss()
    if (role === 'ok') {
      this.onPlayerSelected.emit(data)
      this.onChange?.(data)
    }
  }
}
