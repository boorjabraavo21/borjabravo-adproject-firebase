import { TestBed } from '@angular/core/testing';

import { MediaFirebaseService } from './media-firebase.service';

describe('MediaFirebaseService', () => {
  let service: MediaFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
