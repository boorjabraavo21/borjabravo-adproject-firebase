import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../interfaces/player';
import { FirebaseService } from './firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _players = new BehaviorSubject<Player[]>([])
  public players$ = this._players.asObservable()

  constructor(
    private fbSvc:FirebaseService
  ) { }

  getAll():Observable<Player[]> {
    return new Observable<Player[]>(obs => {
      this.fbSvc.getDocuments("players").then(docs => {
        var players:Player[] = docs.map(player => {
          return {
            id:player.id,
            name:player.data['name'],
            position:player.data['position'],
            nation:player.data['nation'],
            age:player.data['age'],
            rating:player.data['rating'],
            team:player.data['team'],
            picture:player.data['picture'],
            matches:player.data['matches'],
            numbers:player.data['numbers'],
            assists:player.data['assists']
          }
        })
        obs.next(players)
        this._players.next(players)
      })
    })
  }

  getPlayer(id:string):Observable<Player> {
    return new Observable<Player>(player => {
      this.fbSvc.getDocument("players",id).then(doc => {
        const data:Player = {
          id:doc.id,
          name:doc.data['name'],
          position:doc.data['position'],
          nation:doc.data['nation'],
          age:doc.data['age'],
          rating:doc.data['rating'],
          team:doc.data['team'],
          picture:doc.data['picture'],
          matches:doc.data['matches'],
          numbers:doc.data['numbers'],
          assists:doc.data['assists']
        }
        player.next(data)
      })
    })
  }

  query(q:string):Observable<Player[]> {
    return new Observable<Player[]>(obs => {
      this.fbSvc.getDocuments("players").then(docs => {
        var players:Player[] = docs.map(player => {
          return {
            id:player.id,
            name:player.data['name'],
            position:player.data['position'],
            nation:player.data['nation'],
            age:player.data['age'],
            rating:player.data['rating'],
            team:player.data['team'],
            picture:player.data['picture'],
            matches:player.data['matches'],
            numbers:player.data['numbers'],
            assists:player.data['assists']
          }
        })
        obs.next(players)
      })
    })
    
  }

  addPlayer(player:Player):Observable<Player> {
    delete player.id
    player.team = "Created"
    return new Observable<Player>(obs => {
      this.fbSvc.createDocument("players",player).then(_=>{
        this.getAll().subscribe()
        obs.next(player)
        obs.complete()
      }).catch(err => {
        obs.error(err)
      })
    })
  }

  updatePlayer(player:Player):Observable<Player> {
    return new Observable<Player>(obs => {
      this.fbSvc.updateDocument("players",player.id!!,player).then(_=>{
        obs.next(player)
        obs.complete()
      }).catch(err => {
        obs.error(err)
      })
    })
  }

  deletePlayer(player:Player):Observable<void> {
    return new Observable<void>(obs => {
      this.fbSvc.deleteDocument("players",player.id!!).then().catch(err => {
        obs.error(err)
      })
    })
  }
}
