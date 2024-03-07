import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Squad } from 'src/app/interfaces/squad';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss'],
})
export class SquadComponent  implements OnInit {

  @Input() squad:Squad | undefined
  @Output() onEditClicked:EventEmitter<void> = new EventEmitter<void>()
  @Output() onDeleteSquad:EventEmitter<void> = new EventEmitter<void>()
  constructor() { 
  }

  onEditClick(ev:Event) {
    ev.stopPropagation()
    this.onEditClicked.emit()
  }

  deleteSquad(ev:Event) {
    ev.stopPropagation()
    this.onDeleteSquad.emit()
  }

  ngOnInit() {
    
  }

}
