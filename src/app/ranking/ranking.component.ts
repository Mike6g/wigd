import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { User } from '../user';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

    private users: User[];
    private selectedUser: User;
    private loading: boolean = false;
    constructor(
        private userService: UserService,
        private toastr: ToastsManager ) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this.loading = true;
        this.userService.getUsers()
        .then(
            users => {
                if (users) {
                    this.users = users.sort((u1, u2) => u2.points - u1.points);
                }
                this.loading = false;
            })
        .catch(
            error => {
                console.log('Ouch !', error);
                this.toastr.error('Failed to retrieve list', 'Are you logged in ?');
                this.loading = false;
                }
        );
    }

    select(user: User): void {
        if (this.selectedUser === user) {
            this.selectedUser = null;
        } else {
            user.deads = user.deads.sort((d1, d2) => new Date(d1.dod).getTime() - new Date(d2.dod).getTime());
            this.selectedUser = user;
        }
    };

}
