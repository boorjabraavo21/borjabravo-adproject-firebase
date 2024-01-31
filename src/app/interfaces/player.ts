import { PaginatedData } from "./data"

export interface Player {
    id?:string,
    name:string,
    position:'FW' | 'MF' | 'DF' | 'GK',
    nation:string,
    age:number,
    rating:number,
    team?:string,
    picture?:string | null,
    matches?:number,
    numbers?:number,
    assists?:number
}

export type PaginatedPlayers = PaginatedData<Player>