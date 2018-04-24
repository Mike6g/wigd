import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Jsonp } from '@angular/http';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';

import { User } from '../user';
import { Person } from '../person';

@Injectable()
export class UserService {

    private forceUser: string = environment.forceUser;

    private apiURL: string = environment.britBaseURL + 'ng2-lists.php' + this.forceUser;

    constructor( private jsonp: Jsonp,
        private http: Http
        ) { }


    setForceUser(user: string) {
        this.forceUser = '?forceUser=' + user;
        this.apiURL = environment.britBaseURL + 'ng2-lists.php' + this.forceUser;
    }
    getUsers(year?:number): Promise<User[]> {
        let search = new URLSearchParams();
        search.set('users', '');
        search.set('callback', 'JSONP_CALLBACK');
        if(year > 2012){
            search.set('year', String(year));
        }

        return this.jsonp.get(this.apiURL, {search} )
        .toPromise()
        .then(response => response.json() as User[])
        .catch(this.handleError);
    }

    getMe(): Promise<User> {
        let search = new URLSearchParams();
        search.set('user', 'me');
        search.set('callback', 'JSONP_CALLBACK');

        return this.jsonp.get(this.apiURL, {search} )
        .toPromise()
        .then(response => response.json() as User)
        .catch(this.handleError);
    }

    postPersonsList(persons: Person[]): Observable<any> {
        let listParams = new URLSearchParams();
        listParams.set('user', 'me');
        listParams.set('action', 'setList');
        listParams.set('callback', 'JSONP_CALLBACK');

        return this.http.post(this.apiURL, {'data': persons}, {search: listParams});
    }


    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

}
