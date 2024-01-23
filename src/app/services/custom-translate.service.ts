import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {

  private _language = new BehaviorSubject<string>("es")
  public language$ = this._language.asObservable()
  constructor(
    private translate:TranslateService
  ) { }

  private async init() {
    this.translate.addLangs(['es','en'])
    this.translate.setDefaultLang(this._language.value)
  }

  use(language:string) {
    lastValueFrom(this.translate.use(language)).then(_=>{
      this._language.next(language);
    })
  }

  get(key:string) {
    return this.translate.get(key)
  }
}
