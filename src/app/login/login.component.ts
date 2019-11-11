import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { UserService } from '../_service/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
loading = false;
submitted = false;
returnUrl: string;

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private AuthenticationService:AuthService,
    private userService:UserService,
    private ActiavatedRoute:ActivatedRoute
  ) { 
if(this.AuthenticationService.currentUserValue){
  this.router.navigate(['/'])
}

  }

  ngOnInit() {
  this.loginForm=this.formBuilder.group({
    username:['',Validators.required],
    password:['',Validators.required]
  });
  this.returnUrl=this.ActiavatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }
  get f(){
    return this.loginForm.controls  };

    onSubmit(){
      debugger;
      this.submitted=true;
      if(this.loginForm.invalid){
        return;
      }
      this.loading=true;
      this.AuthenticationService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(
        data=>this.router.navigate([this.returnUrl]),
        error => {
        //tosteer error
          this.loading = false;
      });
    }
};
