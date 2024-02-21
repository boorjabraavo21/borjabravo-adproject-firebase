import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player';
import { AuthService } from 'src/app/services/api/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @Output() onPlayerClicked = new EventEmitter()
  showList:boolean = false
  constructor(
    public players:PlayerService,
    private auth:AuthService,
    private router:Router,
  ) {
  }

  ngOnInit(): void {}

  ionViewDidLeave(){
    this.closeList()
  }

  closeList(state:boolean = false) {
    this.showList = state
  }

  toPlayerPage(player:Player) {
    this.router.navigate(['/player-info', player.idPlayer])
    this.onPlayerClicked.emit(player)
  }

  logout() {
    this.auth.logout().subscribe()
  }
}
