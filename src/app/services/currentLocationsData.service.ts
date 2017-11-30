import {Jsonp, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class CurrentLocationsService {

  constructor(private _jsonp: Jsonp) {}

  getData(): Observable<IDataFromDto> {
    const request = this._jsonp.request('https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&' +
      'listing_type=buy&page=1&callback=JSONP_CALLBACK&centre_point=51.684183,-3.431481');
    return request
      .map((data: Response) => data.json().response);
  }

}




