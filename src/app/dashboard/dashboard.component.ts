import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../service/user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 

  private error: string;

  private canForce: boolean = false;
  private forcedUser: string;

  private me: User;
  private users: User[] = [];

  constructor (private userService: UserService) {}

  ngOnInit(): void {
    this.me = new User();
    this.loadMe();
    this.loadUsers();

    this.canForce = !environment.production;
  }

  changeUser() {
    this.userService.setForceUser(this.forcedUser);
    this.loadMe();
  }
  private loadMe() {
    this.userService.getMe()
      .then(me => {
        this.error = null;
        if (me.deads) {
          me.deads = me.deads.sort((d1, d2) => new Date(d1.dod).getTime() - new Date(d2.dod).getTime());
        }
        this.me = me;

      })
      .catch(error => {
        this.error = 'Not logged in';
        this.me = new User();
        this.me.name = this.forcedUser || '';
      });

  }
  private loadUsers() {
    this.userService.getUsers()
      .then(
        users => {
          this.users = users;
      })
    .catch(error => this.error = 'Not logged in');
  }


}
