import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {

  private UserName$ = new BehaviorSubject<string>("");

  constructor(){}

  public getUserNameFromStore(){
    return this.UserName$.asObservable();
  }

  public setUserNameForStore(username:string){
    this.UserName$.next(username);
  }
  
}
