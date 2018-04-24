import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Person } from '../person';
import { POINTS } from '../points';

import { PersonService } from '../service/person.service';
import { UserService } from '../service/user.service';
import { Observable }       from 'rxjs/Observable';

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html',
    styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

    @Input() readOnly: boolean;
    @Input() persons: Person[] = [];
    @Input() deads: Person[] = [];

    private selectedPerson: Person;
    private name: string;
    private maxLength: number = 15;
    private isPristine: boolean = true;
    // private points: number;
    private refreshing: boolean = false;

    constructor (
        private personService: PersonService,
        private userService: UserService,
        private toastr: ToastsManager) { }

    ngOnInit() {
    }

    autoComplete = (keyword: string): Observable<string[]> => {
        return this.personService.find(keyword);
    }

    canAdd() {
        if (!this.persons) {
            return true;
        }
        return this.persons.filter(p => p.dod == null).length < this.maxLength;
    }

    add(): void {
        if (!this.name) {return; }
        let name = this.name.trim();
        if (!name) { return; }
        let person: Person = new Person(name);
        this.persons.push(person);
        person.rank = this.persons.length;
        person.points = POINTS[person.rank - 1];
        this.checkDetailsForAPerson(person);
        this.name = '';
        this.isPristine = false;
    }

    delete(person: Person): void {
        this.persons = this.persons.filter(p => p !== person);
        this.reorder();
        this.isPristine = false;
    }

    select(person: Person): void {
        if (this.selectedPerson === person) {
            this.selectedPerson = null;
        } else {
            this.selectedPerson = person;
        }
    };
    refresh(): void {
        this.refreshing = true;
        if (!this.selectedPerson) {
            //Promise.all(this.persons.reduce((previous, current) => this.checkDetailsForAPerson(current))).then(() => this.refreshing = false);
            //this.persons.forEach(p => this.checkDetailsForAPerson(p)));
            let promised = [];
            this.persons.forEach(p => promised.push(this.checkDetailsForAPerson(p)));
            Promise.all(promised)
                .then(() => this.refreshing = false)
                .catch(() => this.refreshing = false);
        } else {
            this.checkDetailsForAPerson(this.selectedPerson).then(()=> this.refreshing = false);
        }
    }

    reorder() {
        this.persons.forEach((p, i) => { p.rank = i + 1; p.points = POINTS[i]; });
        this.isPristine = false;
    }

    saveList() {
        this.userService.postPersonsList(this.persons).subscribe(result =>
            this.toastr.success('List saved!', 'Success!'),
            error => this.toastr.error('Failed to save list', 'Error'));
    }


    private checkDetailsForAPerson(person: Person): Promise<void> {
        return this.personService.checkLink(person.name).then((result) => {
            person.wikiLink = result;
        }).then(
            () => {
            this.personService.getBDay(person.wikiLink).then((result2) => {
                if (result2[0] !== '') {
                    person.dob = new Date(result2[0]);
                    if (result2[1] !== '') {
                        person.dod = new Date(result2[1]);
                    }
                    if(person.calculateAge){
                        person.calculateAge();
                    }
                }
            });
        }).then(
            () => this.personService.getImage(person.name).then((resultImage) => {
                person.image = resultImage;
            })
        );

    }

}
