import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl:string ="https://localhost:7108/api/Account/";
  private userPayload:any;
  constructor(
    private http:HttpClient,
    private router: Router){
      this.userPayload = this.DecodeToken();
    }

  Register(userObj:any){
   return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

  Login(loginObj:any){
     return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)
  }

  LogOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  StorageToken(tokenValue:string){
    localStorage.setItem('token', tokenValue);
  }

  GetToken(){
    return localStorage.getItem('token');
  }

  IsLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  DecodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.GetToken()!;
    //console.log("DecodeToken" , jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  GetUserNameFromToken(){
    if(this.userPayload)
      return this.userPayload.unique_name;
  }


  
}
