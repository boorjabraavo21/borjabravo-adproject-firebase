import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { User } from '../../interfaces/user';



@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {

  protected _connected = new BehaviorSubject<boolean>(true);
  public isConnected$ = this._connected.asObservable();
  protected _user = new BehaviorSubject<User|null>(null);
  public user$ = this._user.asObservable();
  
  public abstract login(credentials:Object):Observable<User>;

  public abstract loginAnonymously():Observable<void>;

  public abstract register(info:Object):Observable<User>;

  public abstract logout():Observable<void>;

  public abstract me(id:string):Observable<any>;
}