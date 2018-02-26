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

  /**
   * lat and lng is used to set your current location
   * 
   */
  lat: Number;
  lng: Number;

  /**
   * origin and destination variable are used to store your start from and to coordinates 
   * According to the location what you have choosen
   */
  origin: any = {};
  destination: any = {};

  /**
   * searchSource and searchDestination are used to store your location name
   * according to the location what you have choosen
   * also used to pass api to get riders list
   */
  public searchSource: string = null;
  public searchDestination: string = null;

  /**
   * Used to store riders list according to search parameters 
   */
  public searchResults: any = [];
  public selectedIndex = -1;

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

    /**
     * This is used to set your current location
     */
    navigator.geolocation.getCurrentPosition((pos) => {

      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;

    });

    /**
     * This is used connect with Google Maps and enable auto suggestion
     */
    this.mapsAPILoader.load().then(
      () => {

        const autocomplete1 = new google.maps.places.Autocomplete(this.sourceSearchElement.nativeElement, { types: ["address"] });
        autocomplete1.addListener("place_changed", () => {
          this.ngZone.run(() => {
            const place1: google.maps.places.PlaceResult = autocomplete1.getPlace();
            if (place1.geometry === undefined || place1.geometry === null) {
              return;
            }
            this.searchSource = place1.name;
            const lat = place1.geometry.location.lat(),
              lng = place1.geometry.location.lng();
            this.origin = { lat: lat, lng: lng };
          });
        });

        const autocomplete2 = new google.maps.places.Autocomplete(this.destinationSearchElement.nativeElement, { types: ["address"] });
        autocomplete2.addListener("place_changed", () => {
          this.ngZone.run(() => {
            const place2: google.maps.places.PlaceResult = autocomplete2.getPlace();
            if (!place2.geometry || place2.geometry === undefined || place2.geometry === null) {
              return;
            }
            this.searchDestination = place2.name;
            const lat = place2.geometry.location.lat(),
              lng = place2.geometry.location.lng();
            this.destination = { lat: lat, lng: lng };
            this.rideSearch();
          });
        });
      }
    );
  }

  /**
   * 
   * @param datetime 
   * This is used to compare with current time and riders start time
   * return how much time away
   * If the user already left , it shows left time too
   */
  getTimeAway(datetime) {
    let startTime: Date, endTime: Date, difference: number, diffMins: number, diffHrs: number;
    startTime = new Date();
    endTime = new Date(datetime);
    difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    diffHrs = Math.floor((difference % 86400000) / 3600000); // hours
    diffMins = Math.round(((difference % 86400000) % 3600000) / 60000); // minutes

    if (diffHrs > 0 || diffMins > 0 || diffMins > 0) {
      return (diffHrs > 0) ? diffHrs + ' hrs(s) ' + diffMins + ' min(s) away' : diffMins + ' min(s) away';
    } else {
      return (diffHrs < 0)
        ? 'Left before ' + Math.abs(diffHrs) + ' hrs(s) ' + Math.abs(diffMins) + ' min(s)'
        : 'Left before ' + Math.abs(diffMins) + ' min(s)';
    }
  }

  /** 
   * This function is used to filter riders list based on your source and destination 
   */
  rideSearch() {
    this._carPoolService.rideSearch(this.searchSource, this.searchDestination)
      .subscribe(res => {
        this.searchResults = res;
        this.selectedIndex = -1;
      });
  }
  /**
   * 
   * @param id 
   * 
   */
  setSelected(id: number) {
    this.selectedIndex = id;
  }

  /** 
   * This function is used to set confirm ride functionality
   */
  confirmRide() {
    // implement confirm ride functionality here
  }

}
