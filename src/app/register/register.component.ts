import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CarpoolService } from '../carpool.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _carPoolService: CarpoolService
  ) {}

  ngOnInit() {
     this.route.data.subscribe(v => {
      this._carPoolService.appTitle = v.appTitle;
    });
  }

}
