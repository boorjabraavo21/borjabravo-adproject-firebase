import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, IonPopover, ModalController } from '@ionic/angular';
import { Player } from 'src/app/interfaces/player';
import { Squad } from 'src/app/interfaces/squad';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-squad-form',
  templateUrl: './squad-form.component.html',
  styleUrls: ['./squad-form.component.scss'],
})
export class SquadFormComponent  implements OnInit {

  playersAdded:Player[] = []
  form:FormGroup
  mode:'Edit' | 'New' = 'New'
  lineUp: string | undefined
  @Input() set squad(_squad:Squad|null) {
    if(_squad) {
      this.mode = 'Edit'
      this.form.controls['id'].setValue(_squad.id)
      this.form.controls['name'].setValue(_squad.name)
      this.form.controls['lineUp'].setValue(_squad.lineUp)
      this.form.controls['players'].setValue(_squad.players)
      this.form.controls['overall'].setValue(_squad.overall)
      this.playersAdded = _squad.players
    }
  }
  constructor(
    private formB:FormBuilder,
    private modal:ModalController,
    public playerSvc:PlayerService
  ) { 
    this.form = formB.group({
      id:[null],
      name:['',[Validators.required]],
      lineUp:['',[Validators.required]],
      overall:[0, [Validators.required]],
      players:[,[Validators.required]]
    })
  }

  ngOnInit() {
    console.log(this.form.controls['players'].value)
  }

  onSubmit() {
    this.modal.dismiss(this.form.value, 'ok')
    console.log(this.form.controls['players'].value)
  }

  onCancel() {
    this.modal.dismiss(null, 'cancel')
  }

  onSelectLineUp(popover:IonPopover, input:IonInput, lineUp:string) {
    this.form.controls['lineUp'].setValue(lineUp)
    this.lineUp = lineUp
    input.value = lineUp
    this.form.controls['players'].setValue([])
    this.form.controls['overall'].setValue(0)
    this.playersAdded = []
    popover.dismiss()
  }

  onAddPlayer(player:Player | null, index:number) {
    if(player == null && this.playersAdded[index]) {
      const _players = [...this.playersAdded]
      this.playersAdded = [..._players.slice(0,index),..._players.slice(index+1)]
    }
    this.playersAdded[index] = player!!
    console.log(this.playersAdded)
    if (this.playersAdded.length == 2)
      this.form.controls['players'].setValue(this.playersAdded)
    this.form.controls['overall'].setValue(this.calculateOverall())
  }

  calculateOverall():number {
    this.form.controls['overall'].setValue(0)
    var overall = this.form.controls['overall'].value
    this.playersAdded.map(player => {
      overall = overall + player.rating
      console.log("Suma de overall: "+overall)
    })
    console.log("Overall calculada: "+overall / this.playersAdded.length)
    return Math.round(overall / this.playersAdded.length)
  }
}