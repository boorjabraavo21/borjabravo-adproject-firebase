import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.page.html',
  styleUrls: ['./player-info.page.scss'],
})
export class PlayerInfoPage implements OnInit {
  
  playerId:string = "-1";
  player: Player | null = null

  constructor(
    public players:PlayerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.players.getPlayer(this.playerId).subscribe(player => {
      this.player = player
    })
    this.route.paramMap.subscribe(params => {
      this.playerId = params.get('id')!!
      this.getPlayerDetails()
    })
  }

  getPlayerDetails() {
    this.players.getPlayer(this.playerId).subscribe(player => {
      this.player = player
    })
  }
}
