import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { BehaviorSubject, map } from 'rxjs';
import { PlayerFormComponent } from 'src/app/components/player-components/player-form/player-form.component';
import { Pagination } from 'src/app/interfaces/data';
import { Player } from 'src/app/interfaces/player';
import { MediaService } from 'src/app/services/api/media.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-myplayers',
  templateUrl: './myplayers.page.html',
  styleUrls: ['./myplayers.page.scss'],
})
export class MyplayersPage implements OnInit {

  private _players = new BehaviorSubject<Player[] | null>([])
  public players$ = this._players.asObservable()
  /*private _pagination = new BehaviorSubject<Pagination>({ page: 0, pageCount: 0, pageSize: 0, total: 0 })
  public pagination$ = this._pagination.asObservable()*/
  loading: boolean = false

  constructor(
    public playerSvc: PlayerService,
    private modal: ModalController,
    private mediaSvc: MediaService
  ) { }

  ngOnInit() {
    this.onLoadPlayers();this.loading = true
    this.onLoadPlayers()
  }

  async onLoadPlayers(page: number = 0, refresh: any = null) {
    this.playerSvc.query("").subscribe(response => {
      this._players.next(response)
      //this._pagination.next(response.pagination)

      if (refresh)
        refresh.complete()
      this.loading = false
    })
  }

  async presentForm(data: Player | null, onDismiss: (result: any) => void) {
    const modal = await this.modal.create({
      component: PlayerFormComponent,
      componentProps: {
        player: data
      }
    })
    modal.present()
    modal.onDidDismiss().then(result => {
      if (result?.data) {
        onDismiss(result)
      }
    })
  }

  private dataURLtoBlob(dataUrl: string, callback: (blob: Blob) => void) {
    var req = new XMLHttpRequest;

    req.open('GET', dataUrl);
    req.responseType = 'arraybuffer';

    req.onload = function fileLoaded(e) {
      var mime = this.getResponseHeader('content-type');

      callback(new Blob([this.response], { type: mime || undefined }));
    };

    req.send();
  }

  onNewPlayer() {
    var onDismiss = (info: any) => {
      switch (info.role) {
        case 'ok': {
          this.loading = true
          if (info.data.picture) {
            this.dataURLtoBlob(info.data.picture, (blob: Blob) => {
              this.mediaSvc.upload(blob).subscribe((media: number[]) => {
                info.data.picture = media[0]
                this.playerSvc.addPlayer(info.data).subscribe()
                this.onLoadPlayers()
              })
            })
          } else if (info.data.picture == "") {
            info.data.picture = null
            this.playerSvc.addPlayer(info.data).subscribe()
            this.onLoadPlayers();
          }
        }
          break;
      }
    }
    this.presentForm(null, onDismiss)
  }

  onDeletePlayer(player: Player) {
    this.loading = true
    this.playerSvc.deletePlayer(player).subscribe({
      next: obs => {
        this.onLoadPlayers();
      },
      error: err => {
        console.log(err)
      }
    })
  }

  onEditPlayer(player: Player) {
    var onDismiss = (info: any) => {
      switch (info.role) {
        case 'ok': {
          this.loading = true
          if (info.data.picture) {
            this.dataURLtoBlob(info.data.picture, (blob: Blob) => {
              this.mediaSvc.upload(blob).subscribe((media: number[]) => {
                info.data.picture = media[0]
                let _player = { id: player.id, ...info.data }
                this.playerSvc.updatePlayer(_player).subscribe()
                this.onLoadPlayers();
              })
            })
          } else if (info.data.picture == null) {
            this.playerSvc.updatePlayer(info.data).subscribe()
            this.onLoadPlayers();
          }
        }
          break;
      }
    }
    this.presentForm(player, onDismiss)
  }
}
