import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export abstract class HttpClientProvider {

    public abstract getImage(
        url: string
    ): Observable<Blob>;
    
    public abstract get<T>(url: string, params: any, headers: any): Observable<T>;
   
    public abstract post<T>(url: string, body: any, headers: any, urlEncoded?: boolean): Observable<T>;
    
    public abstract put<T>(url: string, body: any, headers: any, urlEncoded?: boolean): Observable<T>;
   
    public abstract patch<T>(url: string, body: any, headers: any, urlEncoded?: boolean): Observable<T>;
    
    public abstract delete<T>(url: string, params: any, headers: any): Observable<T>;
    
    public abstract setServerTrustMode(mode: 'default' | 'nocheck' | 'pinned' | 'legacy'): void;
}