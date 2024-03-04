import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent  implements OnInit {

  constructor() { }

  @Input() player:Player | null = null
  @Output() onClicked: EventEmitter<void> = new EventEmitter<void>

  ngOnInit() {}

  async openPlayerHighlights() {
    console.log(this.player?.highlights)
    await Browser.open({ url: this.player?.highlights! })
  }
}
