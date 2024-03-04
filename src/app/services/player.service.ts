import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Player } from '../interfaces/player';
import { FirebaseDocument, FirebaseService } from './firebase/firebase.service';
import { DocumentData, Unsubscribe } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _players = new BehaviorSubject<Player[]>([])
  public players$ = this._players.asObservable()
  private unsubscr:Unsubscribe|null = null;
  constructor(
    private fbSvc:FirebaseService
  ) { 
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
      highlights:el.data['highlights']
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
    delete player.idPlayer
    player.team = "Created"
    player.highlights = ""
    if(player.picture == null || player.picture == undefined)
      player.picture = ""
    player.matches = 0
    player.assists = 0
    player.numbers = 0
    return new Observable<Player>(obs => {
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
      this.fbSvc.deleteDocument("players",player.idPlayer!!).then().catch(err => {
        this.unsubscr = this.fbSvc.subscribeToCollection('players', this._players, this.mapPlayers);
        obs.error(err)
      })
    })
  }
}
