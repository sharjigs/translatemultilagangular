import { Component, OnInit,OnDestroy } from '@angular/core';
import{Subscription, from} from 'rxjs';
import{first} from 'rxjs/operators'
import{User}from '../_model/user';
import{UserService} from '../_service/user.service';
import{AuthService} from '../_service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
currentUser:User;
currentUserSubscription:Subscription;
users:User[]=[];
  constructor(private authenticationService:AuthService,private userService:UserService ) {
    this.currentUserSubscription=this.authenticationService.currentUser.subscribe(user=>{
      this.currentUser=user;
    });
   }

  ngOnInit() {
    this.loadAllUsers();
  }
ngOnDestroy(){
  this.currentUserSubscription.unsubscribe();
}
deleteUser(id:number){
this.userService.delete(id).pipe(first()).subscribe(()=>{
  this.loadAllUsers();
});
}
  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;
    });
}
}
