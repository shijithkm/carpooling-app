import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CarpoolService {

  public appTitle: string = 'Carpool App';

  constructor(private http: HttpClient) { }

  rideSearch(source,destination) {
    console.log('source',source);
    console.log('destination',destination);
    const options = (source && destination) ?
      {
        params: new HttpParams()
          .set('source', source)
          .set('destination', destination)
      } : {};

      console.log('options',options);

      return this.http.get('http://localhost:5000/ride', options)
                    .map(response => response)
                    .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw('Server Error, Please try after sometime');
  }
}
