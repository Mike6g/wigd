export class Person {
    id: number;
    rank: number;
    points: number;
    name: string;
    dob: Date;
    dod: Date;
    age: number;
    image: string;
    wikiLink: string;
    creationDate: Date;
    replace: boolean;


    constructor(name: string) {
        this.name = name;
    }

    calculateAge(): void {
        let base_to_calculate_age: number = Date.now();
        if (this.dod) {
            base_to_calculate_age = this.dod.getTime();
        }
        if (this.dob) {
            this.age = Math.floor((base_to_calculate_age - this.dob.getTime()) / (31557600000));
        }
    }
    // constructor(id: number, name: string, dob:Date, age:number, image: string, wikiLink:string) { }
}

/*
Person:
    - id
    - rank (points)
    - name
    - DOB (to calculate age)
    - DOD (null until it happens)
    - wikipedia link
    - creation date
*/
