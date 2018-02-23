import { Component, OnInit } from '@angular/core';
import { CarpoolService } from '../carpool.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _carPoolService:CarpoolService) { }

  ngOnInit() {
  }

}
