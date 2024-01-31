import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { SquadFormComponent } from 'src/app/components/squad-components/squad-form/squad-form.component';
import { Pagination } from 'src/app/interfaces/data';
import { Squad } from 'src/app/interfaces/squad';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-mysquads',
  templateUrl: './mysquads.page.html',
  styleUrls: ['./mysquads.page.scss'],
})
export class MySquadsPage implements OnInit {

  private _squads = new BehaviorSubject<Squad[]>([])
  public squads$ = this._squads.asObservable()
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
    this.squads.query("").subscribe(response => {
      this._squads.next(response)
      if(refresh)
        refresh.complete()
      this.loading = false
    })
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
      var squad:Squad = info.data
      squad.players = squad.players.map(p => {
        return {
          id:p.id,
          name:p.name,
          position:p.position,
          nation:p.nation,
          age:p.age,
          rating:p.rating,
          team:p.team,
          picture:p.picture,
          matches:p.matches,
          numbers:p.numbers,
          assists:p.assists,
        }
      })
      this.squads.addSquad(squad).subscribe(_=>{
        this.onLoadSquads()
      })
    }
    this.presentForm(null, onDismiss)
  }

  onEditSquad(squad:Squad) {
    var onDismiss = (info:any) => {
      this.loading = true
      var squad:Squad = info.data
      squad.players = squad.players.map(p => {
        return {
          id:p.id,
          name:p.name,
          position:p.position,
          nation:p.nation,
          age:p.age,
          rating:p.rating,
          team:p.team,
          picture:p.picture,
          matches:p.matches,
          numbers:p.numbers,
          assists:p.assists,
        }
      })
      this.squads.updateSquad(squad).subscribe(_=>{
        this.onLoadSquads()
      })
    }
    this.presentForm(squad, onDismiss)
  }

  onDeleteSquad(squad:Squad) {
    this.loading = true
    this.squads.deleteSquad(squad).subscribe(_=>{
      this.onLoadSquads()
    })
  }

}
