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


  lat: Number = 12.9314583;
  lng: Number = 77.62998579999999;

  origin: any = {  };
  destination: any = { };
  public searchSource: string = null;
  public searchDestination: string = null;
  public searchResults: any = [];
  youAreHere = {
    color: 'green',
    fontSize: '14px',
    fontWeight: 'bold',
    text: 'You are here',
  }

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

    navigator.geolocation.getCurrentPosition((pos)=>{

      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;

    });

    this.mapsAPILoader.load().then(
      () => {

        let autocomplete1 = new google.maps.places.Autocomplete(this.sourceSearchElement.nativeElement, { types: ["address"] });
        autocomplete1.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place1: google.maps.places.PlaceResult = autocomplete1.getPlace();


            if (place1.geometry === undefined || place1.geometry === null) {
              return;
            }
            console.log(place1);
            this.searchSource = place1.name;
            var lat = place1.geometry.location.lat(),
              lng = place1.geometry.location.lng();
            this.origin = { lat: lat, lng: lng };
            console.log(lat);
            console.log(lng);
          });
        });

        let autocomplete2 = new google.maps.places.Autocomplete(this.destinationSearchElement.nativeElement, { types: ["address"] });
        autocomplete2.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place2: google.maps.places.PlaceResult = autocomplete2.getPlace();

            if (!place2.geometry || place2.geometry === undefined || place2.geometry === null) {
              return;
            }
            console.log(place2);
            this.searchDestination = place2.name;
            var lat = place2.geometry.location.lat(),
              lng = place2.geometry.location.lng();
            this.destination = { lat: lat, lng: lng };
            console.log(lat);
            console.log(lng);
            this.rideSearch();
          });
        });

      }
    );

  }

  getTimeAway(datetime){
    let startTime:Date,endTime:Date,difference:number,diffMins:number,diffHrs:number;
    startTime = new Date(); 
    endTime = new Date(datetime);
    difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    diffHrs = Math.floor((difference % 86400000) / 3600000); // hours
    diffMins = Math.round(((difference % 86400000) % 3600000) / 60000); // minutes

    return (diffHrs > 0)? diffHrs +' hrs(s) '+ diffMins +' min(s) away': diffMins + ' min(s) away';
 
  }

  rideSearch() {
    this._carPoolService.rideSearch(this.searchSource, this.searchDestination)
      .subscribe(res => {
        console.log(res);
        this.searchResults = res;
      });
  }

}
