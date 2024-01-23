import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PaginatedPlayers, Player } from '../interfaces/player';
import { DataService } from './api/data.service';
import { FirebaseService } from './firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _players = new BehaviorSubject<Player[]>([])
  public players$ = this._players.asObservable()

  constructor(
    private dataService:DataService,
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
      }).catch(err => {
        obs.error(err)
      })
    })
  }

  updatePlayer(player:Player):Observable<Player> {
    return new Observable<Player>(obs => {
      this.fbSvc.updateDocument("players",player.id!!,player).then().catch(err => {
        obs.error(err)
      })
    })
    /*return this.dataService.put<any>(`players/${player.id}`,player).pipe(map(response => {
      return {
        id:response.id,
        name:response.name,
        position:response.position,
        nation:response.nation,
        age:response.age,
        rating:response.rating,
        team:response.team,
        matches:response.matches,
        numbers:response.numbers,
        assists:response.assists,
        picture:response.picture?.data?{
          id: response.picture.data.id,
          url_large: response.picture.data.attributes.formats.large?.url,
          url_small: response.picture.data.attributes.formats.small?.url,
          url_medium:response.picture.data.attributes.formats.medium?.url,
          url_thumbnail:response.picture.data.attributes.formats.thumbnail?.url,
        }:null
      }
    }))*/
  }

  deletePlayer(player:Player):Observable<Player> {
    return this.dataService.delete<any>(`players/${player.id}`).pipe(tap())
  }
}
