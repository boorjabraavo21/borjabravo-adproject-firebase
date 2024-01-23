import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interfaces/player';

@Pipe({
  name: 'created'
})
export class CreatedPipe implements PipeTransform {
  transform(players: Player[] | null): Player[] {
    let createdPlayers = [...players??[]]
    createdPlayers = createdPlayers.filter(p => p.team == "Created")
    return createdPlayers;
  }
}
