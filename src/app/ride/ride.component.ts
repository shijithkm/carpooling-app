import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  public searchResults:any[] = [1,2,3,4,5,6];

  constructor() { }

  ngOnInit() {
  }

}
