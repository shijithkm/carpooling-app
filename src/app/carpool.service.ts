import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../environments/environment';

@Injectable()
export class CarpoolService {
  /**
   * appTitle variable used to show application title 
   * That dynamically change based on the current page
   */
  public appTitle: string = 'Carpool App';

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param source - From where you want start
   * @param destination - To where you wanna go
   * 
   * This will look all the riders registered 
   * who is travelling today (future dates only)
   * also check the location mathes with source and destination
   *  
   */
  rideSearch(source, destination) {

    const options = (source && destination) ?
      {
        params: new HttpParams()
          .set('source', source)
          .set('destination', destination)
      } : {};

    return this.http.get(environment.CARPOOL_API + 'ride', options)
      .map(response => response)
      .catch(this.handleError);
  }

  /**
   * 
   * @param error 
   * This is going to handle the erros 
   */
  private handleError(error: Response | any) {
    return Observable.throw('Server Error, Please try after sometime');
  }
}
