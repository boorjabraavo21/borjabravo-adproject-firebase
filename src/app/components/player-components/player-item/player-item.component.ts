import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.scss'],
})
export class PlayerItemComponent  implements OnInit {

  private _player:Player | undefined
  @Input('player') set player(_player:Player | undefined) {
    this._player = _player
  }

  @Output('clicked') clicked = new EventEmitter()
  constructor() { }

  get player():Player|undefined {
    return this._player
  }

  onPlayerClicked() {
    this.clicked.emit(this._player)
  }

  ngOnInit() {}

}
