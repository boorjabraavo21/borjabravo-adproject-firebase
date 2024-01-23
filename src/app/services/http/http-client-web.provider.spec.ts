import { TestBed } from '@angular/core/testing';
import { HttpClientWebProvider } from './http-client-web.provider';


describe('HttpClientWebProvider', () => {
  let service: HttpClientWebProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientWebProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
