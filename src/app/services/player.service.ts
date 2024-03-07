import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../interfaces/player';
import { FirebaseDocument, FirebaseService } from './firebase/firebase.service';
import { Unsubscribe } from 'firebase/firestore';
import { AuthService } from './api/auth.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _players = new BehaviorSubject<Player[]>([])
  public players$ = this._players.asObservable()
  private unsubscr:Unsubscribe|null = null;
  private user:User | undefined
  constructor(
    private fbSvc:FirebaseService,
    private authSvc:AuthService
  ) { 
    this.authSvc.me().subscribe(u => { this.user = u })
    this.unsubscr = this.fbSvc.subscribeToCollection('players', this._players, this.mapPlayers);
  }

  mapPlayers(el:FirebaseDocument):Player{
    return {
      idPlayer:el.id,
      playerName:el.data['playerName'],
      position:el.data['position'],
      nation:el.data['nation'],
      age:el.data['age'],
      rating:el.data['rating'],
      team:el.data['team'],
      picture:el.data['picture'],
      matches:el.data['matches'],
      numbers:el.data['numbers'],
      assists:el.data['assists'],
      highlights:el.data['highlights'],
      userId:el.data['userId']
    }
  }

  getPlayer(id:string):Observable<Player> {
    return new Observable<Player>(player => {
      this.fbSvc.getDocument("players",id).then(doc => {
        const data:Player = this.mapPlayers(doc)
        player.next(data)
        player.complete()
      })
    })
  }

  addPlayer(player:Player):Observable<Player> {
    return new Observable<Player>(obs => {
      delete player.idPlayer
      player.team = "Created"
      player.highlights = ""
      if(player.picture == null || player.picture == undefined)
        player.picture = ""
      player.matches = 0
      player.assists = 0
      player.numbers = 0
      player.userId = this.user?.id
      this.fbSvc.createDocument("players",player).then(_=>{
        this.unsubscr = this.fbSvc.subscribeToCollection('players', this._players, this.mapPlayers);
        obs.next(player)
        obs.complete()
      }).catch(err => {
        obs.error(err)
      })
    })
  }

  updatePlayer(player:Player):Observable<Player> {
    return new Observable<Player>(obs => {
      this.fbSvc.updateDocument("players",player.idPlayer!!,player).then(_=>{
        this.unsubscr = this.fbSvc.subscribeToCollection('players', this._players, this.mapPlayers);
      obs.next(player)
        obs.complete()
      }).catch(err => {
        obs.error(err)
      })
    })
  }

  deletePlayer(player:Player):Observable<void> {
    return new Observable<void>(obs => {
      this.fbSvc.getDocuments("squads").then(docs => {
        if(docs.length > 0) {
          docs.map(doc => {
            var players:any[] = doc.data['players'].filter((p:Player) => player.playerName == p.playerName)
            if(players.length <= 0) {
              this.fbSvc.deleteDocument("players",player.idPlayer!!).then(_=>{
                this.unsubscr = this.fbSvc.subscribeToCollection('players', this._players, this.mapPlayers);
              }).catch(err => {
                obs.error(err)
              })
            } else {
              obs.error("No se pudo borrar")
            }
          })
        } else {
          this.fbSvc.deleteDocument("players",player.idPlayer!!).then(_=>{
            this.unsubscr = this.fbSvc.subscribeToCollection('players', this._players, this.mapPlayers);
          }).catch(err => {
            obs.error(err)
          })
        }
      }).catch(err => obs.error(err))
    })
  }
}
