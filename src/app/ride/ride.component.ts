import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CarpoolService } from '../carpool.service';

import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  @ViewChild('sourceSearch') public sourceSearchElement: ElementRef;
  @ViewChild('destinationSearch') public destinationSearchElement: ElementRef;

  public searchResults: any[] = [1, 2, 3, 4, 5];

  lat: Number = 12.9314583;
  lng: Number = 77.62998579999999;
  origin: any = { lat: 12.9314583, lng: 77.62998579999999 };
  destination: any = { lat: 12.9697999, lng: 77.74994670000001 };


  constructor(
    private route: ActivatedRoute,
    private _carPoolService: CarpoolService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.route.data.subscribe(v => {
      this._carPoolService.appTitle = v.appTitle;
    });


    this.mapsAPILoader.load().then(
      () => {

        let autocomplete = new google.maps.places.Autocomplete(this.sourceSearchElement.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            var lat = place.geometry.location.lat(),
              lng = place.geometry.location.lng();
            this.origin = { lat: lat, lng: lng };
            console.log(lat);
            console.log(lng);
          });
        });

        autocomplete = new google.maps.places.Autocomplete(this.destinationSearchElement.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (!place.geometry || place.geometry === undefined || place.geometry === null) {
              return;
            }
            var lat = place.geometry.location.lat(),
              lng = place.geometry.location.lng();
            this.destination = { lat: lat, lng: lng };
            console.log(lat);
            console.log(lng);
          });
        });

      }
    );

  }

}
