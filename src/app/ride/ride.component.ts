import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CarpoolService } from '../carpool.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  public searchResults: any[] = [1, 2, 3, 4, 5];

  lat: Number = 12.9314583;
  lng: Number = 77.62998579999999;
  dir:any = {
    origin: { lat: 12.9314583, lng: 77.62998579999999 },
    destination: { lat: 12.9697999, lng: 77.74994670000001 }
  }

  constructor(
    private route: ActivatedRoute,
    private _carPoolService: CarpoolService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(v => {
      this._carPoolService.appTitle = v.appTitle;
    });
  }

}
