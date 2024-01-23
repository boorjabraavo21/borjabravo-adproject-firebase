import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interfaces/player';

@Pipe({
  name: 'originalPlayer'
})
export class OriginalPlayerPipe implements PipeTransform {

  transform(players: Player[] | null): Player[] {
    let originalPlayers = [...players??[]]
    originalPlayers = originalPlayers.filter(p => p.team != "Created")
    return originalPlayers;
  }

}
