import { Person } from './person';
export class User {
    id: number;
    name: string;
    points: number;
    persons: Person[] = [];
    deads: Person[] = [];
    editionDate: Date;
    priviledges: string;
}

/*
User:
    - name
    - points
    - Person[]
    - History Person[]
    - last edit date ?
    - priviledges ? (admin ?)
*/
