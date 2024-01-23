import { TestBed } from '@angular/core/testing';

import { MediaStrapiService } from './media-strapi.service';

describe('MediaStrapiService', () => {
  let service: MediaStrapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaStrapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
