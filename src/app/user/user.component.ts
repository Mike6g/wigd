import { Component, OnInit, Input } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  @Input() readOnly: boolean = false;
  private editionDate: Date;

  constructor() { }

  ngOnInit() {
  }

  getEditionDate(): Date {
      if (this.user.editionDate) {
          this.editionDate = new Date(
              Number(String(this.user.editionDate).substring(0, 4)), // year
              Number(String(this.user.editionDate).substring(4, 6)) - 1, // month
              Number(String(this.user.editionDate).substring(6, 8)) // day
              );
      }
      return this.editionDate;
  }

}
