import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {
    private wikiUrl: string = 'https://fr.wikipedia.org/w/api.php';

    private britUrl: string = environment.britBaseURL + '/ng2-lists.php';

    constructor(private jsonp: Jsonp) { }

    /**
        called by persons.component when a text is entered
        Returns an array of strings
    */
    find(keyword: string): Observable<any[]> {
        let search = new URLSearchParams();
        search.set('action', 'opensearch');
        search.set('format', 'json');
        search.set('limit', '5');
        search.set('callback', 'JSONP_CALLBACK');
        search.set('search', keyword);
        return this.jsonp.get(this.wikiUrl, { search }).map(p => p.json()[1]);

    }

    /**
        used when a user adds a person to its list
    */
    checkLink(fullName: string) {
        let search = new URLSearchParams();
        search.set('action', 'opensearch');
        search.set('format', 'json');
        search.set('limit', '1');
        search.set('callback', 'JSONP_CALLBACK');
        search.set('search', fullName);
        return this.jsonp
        .get(this.wikiUrl, { search })
        .toPromise()
        .then((response) => response.json()[3][0]);
    }

    /** 
        used when a user adds a person to its list to extract its BDay (and DDay)
    */
    getBDay(wikiLink: string) {
        let search = new URLSearchParams();
        search.set('action', 'getBday');
        search.set('url', wikiLink);
        search.set('callback', 'JSONP_CALLBACK');
        return this.jsonp
        .get(this.britUrl, {search })
        .toPromise()
        .then((response) => response.json());
    }

    /** 
        used when a user adds a person to its list to extract its image
        */
    getImage(fullName: string) {
        let search = new URLSearchParams();
        search.set('action', 'getImage');
        search.set('search', fullName);
        search.set('callback', 'JSONP_CALLBACK');
        return this.jsonp
        .get(this.britUrl, { search })
        .toPromise()
        .then((response) => response.json());
    }

}
