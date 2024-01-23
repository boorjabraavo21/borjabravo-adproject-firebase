import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, IonItem, IonPopover, ModalController } from '@ionic/angular';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss'],
})
export class PlayerFormComponent  implements OnInit {

  form:FormGroup
  mode:'New' | 'Edit' = 'New'
  @Input('player') set player(_player:Player|null) {
    if(_player) {
      this.mode = 'Edit'
      this.form.controls['id'].setValue(_player.id)
      this.form.controls['name'].setValue(_player.name)
      this.form.controls['position'].setValue(_player.position)
      this.form.controls['nation'].setValue(_player.nation)
      this.form.controls['age'].setValue(_player.age)
      this.form.controls['picture'].setValue(_player.picture?.url_thumbnail)
      this.form.controls['rating'].setValue(_player.rating)
    }
  }
  constructor(
    private formB:FormBuilder,
    private modal:ModalController
  ) { 
    this.form = this.formB.group({
      id:[null],
      name:['',[Validators.required]],
      age:[0,[Validators.required]],
      position:['',[Validators.required]],
      nation:['',[Validators.required]],
      rating:[0,[Validators.required]],
      picture:['']
    })
  }

  ngOnInit() {}

  onSubmit() {
    this.modal.dismiss(this.form.value, 'ok')
  }

  onCancel() {
    this.modal.dismiss(null, 'cancel')
  }

  onSelectPosition(popover:IonPopover, input:IonInput, position:string) {
    this.form.controls['position'].setValue(position)
    input.value = position
    popover.dismiss()
  }
}
