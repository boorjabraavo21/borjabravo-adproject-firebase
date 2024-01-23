import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent  implements OnInit {

  constructor() { }

  @Input() player:Player | null = null

  ngOnInit() {}

}
