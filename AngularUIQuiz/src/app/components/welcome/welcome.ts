import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { ApiService } from '../../services/api';
import { UserStoreService } from '../../services/user-store';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class WelcomeComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private userStore: UserStoreService) { }

  public users: any = [];
  public userName: string = "";

  ngOnInit(): void {
    this.userStore.getUserNameFromStore().subscribe(val=>{
      let userFormToken = this.auth.GetUserNameFromToken();
      this.userName = val || userFormToken;
    })

    this.api.getUsers()
      .subscribe({
        next: (res) => {
          this.users = res;
          //alert(res.message);
        },
        error: (err) => {
          alert(err?.error.message)
        }
      })
  }

  logOut() {
    this.auth.LogOut();
  }

}
