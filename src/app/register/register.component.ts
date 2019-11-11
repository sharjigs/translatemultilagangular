import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators,ReactiveFormsModule } from '@angular/forms'
import{Router} from '@angular/router';
import { first} from 'rxjs/operators';
import { UserService } from '../_service/user.service';
import { AuthService } from '../_service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registrationForm:FormGroup;
loading=false;
submitted=false;
  constructor(
    private forBuilder:FormBuilder,
    private userService:UserService,
    private AuthenticationService:AuthService,
    private router:Router
  ) { 
    //navigate to home if Already logged in
    if(this.AuthenticationService.currentUserValue){
     this.router.navigate(['/'])
    }
  }

  ngOnInit() {
    this.registrationForm=this.forBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      username:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }
      // convenience getter for easy access to form fields
  get f(){
    return this.registrationForm.controls;
  }
onSubmit(){
  debugger;
  this.submitted=true;
  if(this.registrationForm.invalid){
    return;
  }
  this.loading=true;
  this.userService.register(this.registrationForm.value).pipe(first()).subscribe( 
    data=>{
      //toastermessage
      this.router.navigate(['/login']);
    },
    error => {
     // toaster message
      //this.alertService.error(error);
      this.loading = false;
  });
}
}
