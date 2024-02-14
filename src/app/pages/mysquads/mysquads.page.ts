import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SquadFormComponent } from 'src/app/components/squad-components/squad-form/squad-form.component';
import { Squad } from 'src/app/interfaces/squad';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-mysquads',
  templateUrl: './mysquads.page.html',
  styleUrls: ['./mysquads.page.scss'],
})
export class MySquadsPage implements OnInit {
  
  loading:boolean = false
  constructor(
    public squads:SquadService,
    private modal:ModalController
  ) { }

  ngOnInit() {
    this.loading = true
    this.onLoadSquads()
  }

  onLoadSquads(page:number = 0, refresh:any = null) {
    this.loading = false
    /*this.squads.query("").subscribe(response => {
      this._squads.next(response)
      if(refresh)
        refresh.complete()
      this.loading = false
    })*/
  }

  async presentForm(data:Squad | null, onDismiss:(result:any)=>void) {
    const modal = await this.modal.create({
      component:SquadFormComponent,
      componentProps: {
        squad:data
      },
      cssClass:'squad-modal'
    })
    modal.present()
    modal.onDidDismiss().then(result => {
      if(result?.data) {
        onDismiss(result)
      }
    })
  }

  onNewSquad() {
    var onDismiss = (info:any) => {
      this.loading = true
      this.squads.addSquad(info.data).subscribe(_=>{
        this.onLoadSquads()
      })
    }
    this.presentForm(null, onDismiss)
  }

  onEditSquad(squad:Squad) {
    var onDismiss = (info:any) => {
      this.loading = true
      squad = info.data
      this.squads.updateSquad(squad).subscribe(_=>{
        this.onLoadSquads()
      })
    }
    this.presentForm(squad, onDismiss)
  }

  onDeleteSquad(squad:Squad) {
    this.loading = true
    this.squads.deleteSquad(squad).subscribe()
    this.onLoadSquads()
  }
}
