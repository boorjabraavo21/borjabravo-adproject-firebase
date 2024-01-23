import { Component,  EventEmitter,  Input,  OnInit, Output } from '@angular/core';
import { Player } from 'src/app/interfaces/player';



@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent  implements OnInit {

  @Input() player: Player | null = null
  @Output() onCardClicked:EventEmitter<void> = new EventEmitter<void>()
  @Output() onDeleteClicked:EventEmitter<void> = new EventEmitter<void>()
  @Output() onEditClicked:EventEmitter<void> = new EventEmitter<void>()
  constructor(

  ) { }

  ngOnInit() {}

  onCardClick() {
    this.onCardClicked.emit()
  }

  onDeleteClick(ev:Event) {
    ev.stopPropagation()
    this.onDeleteClicked.emit()
  }

  onEditClick(ev:Event) {
    ev.stopPropagation()
    this.onEditClicked.emit()
  }

}
