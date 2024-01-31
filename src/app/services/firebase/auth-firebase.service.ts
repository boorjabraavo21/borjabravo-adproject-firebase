import { Observable, lastValueFrom } from 'rxjs';
import { UserCredentials } from '../../interfaces/user-credentials';
import { UserRegisterInfo } from '../../interfaces/user-register-info';
import { AuthService } from '../api/auth.service';
import { User } from '../../interfaces/user';
import { FirebaseService } from './firebase.service';


export class AuthFirebaseService extends AuthService {

  constructor(
    private fbSvc:FirebaseService
  ) {
    super();
    fbSvc.isLogged$.subscribe(logged => {
      if(logged) {
        this.me().subscribe(user => {
          this._user.next(user)
        })
      } else {
        this._user.next(null)
      }
      this._connected.next(logged)
    })
  }

  public loginAnonymously():Observable<void> {
    return new Observable<void>(obs => {
      this.fbSvc.connectAnonymously().then(fn => {
        obs.next(fn)
        obs.complete()
        this._connected.next(true)
      }).catch(err => {
        obs.error(err)
      })
    })
  }
 
  public login(credentials:UserCredentials):Observable<User>{
    return new Observable<User>(obs=>{
      this.fbSvc.connectUserWithEmailAndPassword(credentials.email, credentials.password).then(async fbCredentials => {
        const user_id = fbCredentials?.user.user.uid
        if(user_id) {
          const user = await lastValueFrom(this.me())
          this._connected.next(true)
          this._user.next(user)
          obs.next(user)
          obs.complete()
        }
      }).catch(err => {
        obs.error(err)
      })
    });
  }

  logout():Observable<void>{
    return new Observable<void>(obs => {
      this.fbSvc.signOut(false).then(fn =>{
        obs.next(fn)
        obs.complete()
        this._connected.next(false)
        this._user.next(null)
      }).catch(err => {
        obs.error(err)
      })
    })
  }

  register(info:UserRegisterInfo):Observable<User>{
    return new Observable<User>(obs=>{
      this.fbSvc.createUserWithEmailAndPassword(info.email, info.password).then(credentials => {
        const _user = credentials?.user.user
        const _extendedUser:User = {
          id:_user?.uid,
          name:info.name,
          surname:info.surname,
          nickname:info.nickname
        }
        const _extUserWithOutId:any = {
          name:_extendedUser.name,
          surname:_extendedUser.surname,
          nickname:_extendedUser.nickname
        }
        this.fbSvc.createDocumentWithId("users", _extUserWithOutId, _user?.uid!!)
        this._user.next(_extendedUser)
        this._connected.next(true)
        obs.next(_extendedUser)
        obs.complete()
      }).catch(err => {
        obs.error(err)
      })
    });
  }

  public me():Observable<User>{
    return new Observable<User>(obs=>{
      if(this.fbSvc.getUser()?.uid) {
        const id:string = this.fbSvc.getUser()?.uid!!
        this.fbSvc.getDocument("users",id).then(doc => {
          const data:any = doc.data
          const _user:User = {
            id: doc.id,
            name: data['name'],
            surname: data['surname'],
            nickname: data['nickname']
          }
          this._user.next(_user)
          obs.next(_user)
          obs.complete()
        }).catch(err => {
          obs.error(err)
        })
      }
    })
  }
}