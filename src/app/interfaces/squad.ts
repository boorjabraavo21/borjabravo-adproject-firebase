import { PaginatedData } from "./data";
import { Player } from "./player";

export interface Squad {
    id?:string,
    name:string,
    lineUp?:'4-3-3' | '4-4-2' | '3-4-3',
    overall:number,
    players:Player[],
    userId?:string
}

export type PaginatedSquads = PaginatedData<Squad>
