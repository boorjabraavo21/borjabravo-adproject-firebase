import { Component } from '@angular/core';
import { AuthService } from './services/api/auth.service';
import { Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';
import { delay, of, tap } from 'rxjs';
import { CustomTranslateService } from './services/custom-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  lang:string = "es"
  constructor(
    public translate:CustomTranslateService,
    public auth:AuthService,
    private router:Router
  ) {
    translate.use(this.lang)
  }

  onLang(lang:string){
    this.lang = lang;
    this.translate.use(this.lang);
    return false;    
  }

  close(menu:IonMenu){
    of('').pipe(delay(500),tap(_=>menu.close())).subscribe();
  }
  
  onSignOut(menu:IonMenu){
    this.auth.logout().subscribe(async _=>{
      await this.router.navigate(['/login']);
      menu.close();
    });
  }

  routeInclude(path:string):boolean{
    return this.router.url.includes(path);
  }
}