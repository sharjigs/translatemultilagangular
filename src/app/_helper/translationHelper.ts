import { TranslateService } from '@ngx-translate/core';
import {Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class TranslationHelper {
    lastselectedlang: any;
    constructor(private translate: TranslateService) {
      debugger;
      this.lastselectedlang = localStorage.getItem('key');
      if(this.lastselectedlang == undefined)
        {
        translate.setDefaultLang('en');     
        localStorage.setItem('key', 'en');   
      }
      else{
        translate.setDefaultLang(this.lastselectedlang)
      }
      }
      switchLanguage(language: string) {
        localStorage.setItem('key', language);

        this.lastselectedlang = localStorage.getItem('key');
        debugger
        this.translate.use(language);
        console.log(language);
      }}
