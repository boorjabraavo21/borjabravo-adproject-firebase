import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SquadFormComponent } from 'src/app/components/squad-components/squad-form/squad-form.component';
import { Squad } from 'src/app/interfaces/squad';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/api/auth.service';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-mysquads',
  templateUrl: './mysquads.page.html',
  styleUrls: ['./mysquads.page.scss'],
})
export class MySquadsPage implements OnInit {
  
  squads: Squad[] = []
  private user:User | null = null
  loading:boolean = false
  constructor(
    public squadsSvc:SquadService,
    private modal:ModalController,
    private authSvc:AuthService
  ) { 
    this.authSvc.user$.subscribe(u => { this.user = u })
  }

  ngOnInit() {
    this.loading = true
    this.onLoadSquads()
  }

  onLoadSquads(page:number = 0, refresh:any = null) {
    this.loading = false
    this.squadsSvc.squads$.subscribe(_squads => {
      console.log(this.user?.id)
      this.squads = _squads.filter(s => s.userId == this.user?.id )
      console.log(this.squads)
    })
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
      this.squadsSvc.addSquad(info.data).subscribe(_=>{
        this.onLoadSquads()
      })
    }
    this.presentForm(null, onDismiss)
  }

  onEditSquad(squad:Squad) {
    var onDismiss = (info:any) => {
      switch (info.role) {
        case 'ok': {
          this.loading = true
          squad = info.data
          this.squadsSvc.updateSquad(squad).subscribe(_=>{
            this.onLoadSquads()
          })
        }
        break;
        case 'cancel': {
          this.loading = true
          this.squadsSvc.getSquad(squad.id!).subscribe(_=> {
            this.onLoadSquads()
          })
        }
      }
    }
    this.presentForm(squad, onDismiss)
  }

  onDeleteSquad(squad:Squad) {
    this.loading = true
    this.squadsSvc.deleteSquad(squad).subscribe()
    this.onLoadSquads()
  }
}
