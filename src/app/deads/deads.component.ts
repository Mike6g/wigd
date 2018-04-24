import { Component, OnInit, Input } from '@angular/core';

import { Person } from '../person';

@Component({
  selector: 'app-deads',
  templateUrl: './deads.component.html',
  styleUrls: ['./deads.component.css']
})
export class DeadsComponent implements OnInit {

  @Input() deads: Person;
  constructor() { }

  ngOnInit() {
  }

}
