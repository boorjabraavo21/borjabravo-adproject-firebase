import { TestBed } from '@angular/core/testing';

import { DataStrapiService } from './data-strapi.service';

describe('DataStrapiService', () => {
  let service: DataStrapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStrapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
