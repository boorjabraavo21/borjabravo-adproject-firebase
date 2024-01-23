import { HttpClientProvider } from './http-client.provider';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class HttpClientWebProvider extends HttpClientProvider{

  constructor(private readonly httpClient:HttpClient) {
    super();
  }

  public getImage(
    url: string
  ): Observable<Blob>{
      return this.httpClient.get(url, {
          responseType:"blob"
      });
  }

  public get<T>(
      url: string,
      params: any = {},
      headers: any = {}
  ): Observable<T> {

      return this.httpClient.get<T>(url, {
          params: new HttpParams({ fromObject: params }),
          headers: this.createHeaders(headers)
      });
  }

  public post<T>(
      url: string,
      body: any = {},
      headers: any = {},
      urlEncoded: boolean = false
  ): Observable<T> {

      return this.httpClient.post<T>(url, this.createBody(body, urlEncoded), {
          headers: this.createHeaders(headers, urlEncoded)
      });
  }

  public put<T>(
      url: string,
      body: any = {},
      headers: any = {},
      urlEncoded: boolean = false
  ): Observable<T> {

      return this.httpClient.put<T>(url, this.createBody(body, urlEncoded), {
          headers: this.createHeaders(headers, urlEncoded)
      });
  }

  public patch<T>(
      url: string,
      body: any = {},
      headers: any = {},
      urlEncoded: boolean = false
  ): Observable<T> {

      if(body instanceof FormData){
          return this.httpClient.patch<T>(url, body, {headers:headers});
      }
      else{
          return this.httpClient.patch<T>(url, this.createBody(body, urlEncoded), {
              headers: this.createHeaders(headers, urlEncoded)
          });
      }
      
  }

  public delete<T>(
      url: string,
      params: any = {},
      headers: any = {}
  ): Observable<T> {

      return this.httpClient.delete<T>(url, {
          params: new HttpParams({ fromObject: params }),
          headers: this.createHeaders(headers)
      });
  }

  public setServerTrustMode(mode: 'default' | 'nocheck' | 'pinned' | 'legacy'): void { }

  private createHeaders(
      headers: any,
      urlEncoded: boolean = false
  ): HttpHeaders {

      var _headers = new HttpHeaders(headers);
      if(urlEncoded)
          _headers.set('Accept', ' application/x-www-form-urlencoded');
      return _headers;
  }

  private createBody(body: any, urlEncoded: boolean): any | HttpParams {

      return urlEncoded
          ? new HttpParams({ fromObject: body })
          : body;
  }
}
