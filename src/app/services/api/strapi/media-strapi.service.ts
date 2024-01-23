import { StrapiUploadResponse } from 'src/app/interfaces/strapi';
import { ApiService } from '../api.service';
import { MediaService } from '../media.service';
import { Observable, map } from 'rxjs';

export class MediaStrapiService extends MediaService {
  constructor(
    private apiSvc:ApiService
  ) {
    super();
  }

  public override upload(blob: Blob): Observable<number[]> {
    const formData = new FormData()
    formData.append('files',blob)
    return this.apiSvc.post('/upload',formData).pipe(map((response:StrapiUploadResponse) => {
      return response.map(media => media.id)
    }))
  }
}
