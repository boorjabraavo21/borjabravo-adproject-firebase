import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PaginatedSquads, Squad } from '../interfaces/squad';
import { DataService } from './api/data.service';

@Injectable({
  providedIn: 'root'
})
export class SquadService {

  private _squads = new BehaviorSubject<PaginatedSquads>({data:[], pagination:{page:0, pageCount: 0, pageSize: 0, total: 0}})
  public squads$ = this._squads.asObservable()

  constructor(
    private dataSvc:DataService
  ) { }

  addSquad(squad:Squad):Observable<Squad> {
    delete squad.id
    return this.dataSvc.post<Squad>("squads",squad).pipe(tap(_=>{
      this.getAll().subscribe()
    }))
  }

  getAll():Observable<PaginatedSquads> {
    return this.dataSvc.query<any>("squads?populate[players][populate][0]=picture",{}).pipe(map(response => {
      return {
        data:response.data.map(squad => {
          return {
            id:squad.id,
            name:squad.name,
            lineUp:squad.lineUp,
            players:squad.players.data.map((player:any) => {
              return {
                id:player.id,
                name:player.attributes.name,
                position:player.attributes.position,
                nation:player.attributes.nation,
                age:player.attributes.age,
                rating:player.attributes.rating,
                team:player.attributes.team,
                matches:player.attributes.matches,
                numbers:player.attributes.numbers,
                assists:player.attributes.assists,
                picture:player.attributes.picture?.data?{
                  id: player.attributes.picture.data.id,
                  url_large: player.attributes.picture.data.attributes.formats.large?.url,
                  url_small: player.attributes.picture.data.attributes.formats.small?.url,
                  url_medium:player.attributes.picture.data.attributes.formats.medium?.url,
                  url_thumbnail:player.attributes.picture.data.attributes.formats.thumbnail?.url,
                }:null
              }
            })
          }
        }),
        pagination:response.pagination
      }
    }), tap(squads =>{
      this._squads.next(squads)
    }))
  }

  query(q:string):Observable<PaginatedSquads> {
    return this.dataSvc.query<any>("squads?populate[players][populate][0]=picture", {}).pipe(map(response => {
      return {
        data:response.data.map(squad => {
          return {
            id:squad.id,
            name:squad.name,
            lineUp:squad.lineUp,
            players:squad.players.data.map((player:any) => {
              return {
                id:player.id,
                name:player.attributes.name,
                position:player.attributes.position,
                nation:player.attributes.nation,
                age:player.attributes.age,
                rating:player.attributes.rating,
                team:player.attributes.team,
                matches:player.attributes.matches,
                numbers:player.attributes.numbers,
                assists:player.attributes.assists,
                picture:player.attributes.picture?.data?{
                  id: player.attributes.picture.data.id,
                  url_large: player.attributes.picture.data.attributes.formats.large?.url,
                  url_small: player.attributes.picture.data.attributes.formats.small?.url,
                  url_medium:player.attributes.picture.data.attributes.formats.medium?.url,
                  url_thumbnail:player.attributes.picture.data.attributes.formats.thumbnail?.url,
                }:null
              }
            })
          }
        }),
        pagination:response.pagination
      }
    }))
  }

  getSquad(id:number):Observable<Squad> {
    return this.dataSvc.get<any>(`squads/${id}?populate[players][populate][0]=picture`).pipe(map(squad => {
      return {
        id:squad.id,
        name:squad.name,
        lineUp:squad.lineUp,
        players:squad.players.data.map((player:any) => {
          return {
            id:player.id,
            name:player.attributes.name,
            position:player.attributes.position,
            nation:player.attributes.nation,
            age:player.attributes.age,
            rating:player.attributes.rating,
            team:player.attributes.team,
            matches:player.attributes.matches,
            numbers:player.attributes.numbers,
            assists:player.attributes.assists,
            picture:player.attributes.picture?.data?{
              id: player.attributes.picture.data.id,
              url_large: player.attributes.picture.data.attributes.formats.large?.url,
              url_small: player.attributes.picture.data.attributes.formats.small?.url,
              url_medium:player.attributes.picture.data.attributes.formats.medium?.url,
              url_thumbnail:player.attributes.picture.data.attributes.formats.thumbnail?.url,
            }:null
          }
        })
      }
    }))
  }

  updateSquad(squad:Squad):Observable<Squad> {
    return this.dataSvc.put<any>(`squads/${squad.id}?populate[players][populate][0]=picture`,squad).pipe(map(squad => {
      return {
        id:squad.id,
        name:squad.name,
        lineUp:squad.lineUp,
        players:squad.players.data.map((player:any) => {
          return {
            id:player.id,
            name:player.attributes.name,
            position:player.attributes.position,
            nation:player.attributes.nation,
            age:player.attributes.age,
            rating:player.attributes.rating,
            team:player.attributes.team,
            matches:player.attributes.matches,
            numbers:player.attributes.numbers,
            assists:player.attributes.assists,
            picture:player.attributes.picture?.data?{
              id: player.attributes.picture.data.id,
              url_large: player.attributes.picture.data.attributes.formats.large?.url,
              url_small: player.attributes.picture.data.attributes.formats.small?.url,
              url_medium:player.attributes.picture.data.attributes.formats.medium?.url,
              url_thumbnail:player.attributes.picture.data.attributes.formats.thumbnail?.url,
            }:null
          }
        })
      }
    }))
  }

  deleteSquad(squad:Squad):Observable<Squad> {
    return this.dataSvc.delete<Squad>(`squads/${squad.id}`).pipe(tap())
  }
}
