import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { MediaService } from '../api/media.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaFirebaseService extends MediaService {
  constructor(
    private fbSvc:FirebaseService
  ) {
    super();
  }
  public override upload(blob: Blob): Observable<number[]> {
    return new Observable<number[]>(obs => {
      this.fbSvc.imageUpload(blob).then(object => {
        obs.next(object)
        obs.complete()
      }).catch(err => {
        obs.error(err)
      })
    })
  }
}
