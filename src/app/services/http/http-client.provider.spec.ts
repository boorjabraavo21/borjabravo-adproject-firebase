import { TestBed } from '@angular/core/testing';
import { HttpClientProvider } from './http-client.provider';



describe('HttpClientProvider', () => {
  let service: HttpClientProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
