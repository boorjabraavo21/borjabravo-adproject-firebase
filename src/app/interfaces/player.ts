import { PaginatedData } from "./data"
import { Media } from "./media"

export interface Player {
    id?:string,
    name:string,
    position:'FW' | 'MF' | 'DF' | 'GK',
    nation:string,
    age:number,
    rating:number,
    team?:string,
    picture?:Media | null,
    matches:number,
    numbers:number,
    assists:number
}

export type PaginatedPlayers = PaginatedData<Player>