import { Component, OnInit } from '@angular/core';
import { TranslationHelper } from 'src/app/_helper/translationHelper';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthService } from './_service/auth.service';
import { Router } from '@angular/router';
import { User } from './_model/user';
// import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[TranslationHelper]
})


export class AppComponent implements OnInit {
  user = {
    name: 'Arthur',
    age: 42
  };
  language:string;
  currentUser: User;
    constructor(private _translateHelper: TranslationHelper,
      private authenticationService:AuthService,
      private router:Router
      ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(){
this.switchlang(this.language);
  }
  switchlang(language){
    this._translateHelper.switchLanguage(language);
    console.log(language);
  }
  logout() {
    debugger;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
