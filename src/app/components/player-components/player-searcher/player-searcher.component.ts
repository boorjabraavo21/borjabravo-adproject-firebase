import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController, ToastController, ToastOptions } from '@ionic/angular';
import { Player } from 'src/app/interfaces/player';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/api/auth.service';
import { PlayerService } from 'src/app/services/player.service';


@Component({
  selector: 'app-player-searcher',
  templateUrl: './player-searcher.component.html',
  styleUrls: ['./player-searcher.component.scss'],
})
export class PlayerSearcherComponent  implements OnInit {

  players:Player[] = []
  private user:User | undefined
  //pagination:Pagination = ({page:0, pageCount: 0, pageSize: 0, total:0})
  @Input() playersSelected:Player[] = []
  @Input() originalPlayers:boolean = false
  @Input() player:Player | null = null
  @Output() onPlayerClicked = new EventEmitter()
  @Input() showList:boolean = false
  @Output() sendStateList = new EventEmitter()
  constructor(
    public plySvc:PlayerService,
    private popover:PopoverController,
    private toast:ToastController,
    private authSvc:AuthService
  ) {}

  ngOnInit() {
    this.authSvc.me().subscribe(u => { this.user = u })
  }

  onLoadPlayers(){
    this.plySvc.players$.subscribe(_players => {
      var originalPlayers = [..._players.filter(p => p.team != "Created")]
      var userPlayers = [..._players.filter(p => p.userId == this.user?.id)]
      this.players = originalPlayers.concat(userPlayers)
      this.showList = true
      this.sendStateList.emit(true)
    })
  }

  onFilter(evt:any) {
    this.filter(evt.target.value.toLowerCase())
  }

  private filter(value:string) {
    const query = value
    this.plySvc.players$.subscribe(_players => {
      var originalPlayers = [..._players.filter(p => p.team != "Created")]
      var userPlayers = [..._players.filter(p => p.userId == this.user?.id)]
      this.players = originalPlayers.concat(userPlayers).filter(p => p.playerName.toLowerCase().includes(query))
    })
  }

  onPlayerClick(player:Player){
    const _player = this.playersSelected.find(p => p?.idPlayer == player.idPlayer)
    if (_player) {
      const options:ToastOptions = {
        message:`Este jugador ya ha sido seleccionado`,
        duration:1000,
        position:'bottom',
        color:'danger',
        cssClass:'red-toast'
      }
      this.toast.create(options).then(toast=>toast.present())
    } else {
      this.onPlayerClicked.emit(player)
      this.popover.dismiss(player,"ok")
      this.showList = false
      this.sendStateList.emit(false)
    }
  }
}