import { Injectable } from '@angular/core';
import{HttpClient,HttpErrorResponse} from '@angular/common/http'
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl='';
  errorData:{};
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      debugger;
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  login(username:string,password:string){
    debugger
    return this.http.post<any>(`${this.serverUrl}/users/authenticate`, {username: username, password: password})
 .pipe(map(user=>{
   if(user&& user.token){
     localStorage.setItem('currentUser',JSON.stringify(user));
	 this.currentUserSubject.next(user);
   }
 }),
 catchError(this.handleError)
 );
}

isLoggedIn(){
  if(localStorage.getItem('currentUser')){
    return true;
  }
  return false;
}
getAuthorizationToken(){
  const currentUser=JSON.parse(localStorage.getItem('currentUser'));
}

logout(){
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}

private handleError(error:HttpErrorResponse){
  if(error.error instanceof ErrorEvent){
    console.error('An error Ocuured:',error.error.message);
  }
  else{
    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
  }
  this.errorData = {
    errorTitle: 'Oops! Request for document failed',
    errorDesc: 'Something bad happened. Please try again later.'
  };
  return throwError(this.errorData);
};
}

