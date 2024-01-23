import { DataService } from '../data.service';
import { Observable, map } from 'rxjs';
import { PaginatedData } from 'src/app/interfaces/data';
import { StrapiArrayResponse, StrapiResponse } from 'src/app/interfaces/strapi';
import { ApiService } from '../api.service';

export class DataStrapiService extends DataService {
  constructor(
    protected api:ApiService
  ) {
    super();
  }

  public query<T>(resource:string, params:any):Observable<PaginatedData<T>>{
    return this.api.get(`/${resource}`, params).pipe(map((response:StrapiArrayResponse<T>)=>{
      return {
        data: response.data.map(data=>{return {...(data.attributes), id:data.id};}), 
        pagination: response.meta.pagination!};
    }));
  }

  public get<T>(resource:string):Observable<T>{
    return this.api.get(`/${resource}`).pipe(map((response:StrapiResponse<T>)=>{
      return response.data.attributes;
    }));
  }

  public post<T>(resource:string, data:any):Observable<T>{
    return this.api.post(`/${resource}`, {data:data} as Object).pipe(map((response:StrapiResponse<T>)=>{
      return {id:response.data.id, ...response.data.attributes};
    }));
  }

  public put<T>(resource:string, data:any):Observable<T>{
    return this.api.put(`/${resource}`, {data:data}).pipe(map((response:StrapiResponse<T>)=>{
      return {id:response.data.id, ...response.data.attributes};
    }));
  }

  public delete<T>(resource:string):Observable<T>{
    return this.api.delete(`/${resource}`).pipe(map((response:StrapiResponse<T>)=>{
      return {id:response.data.id, ...response.data.attributes};
    }));
  }

}
