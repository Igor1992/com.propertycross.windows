import {Jsonp} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CurrentLocationsService {

  constructor(private _jsonp: Jsonp) {}

  getData(): any{
    return this._jsonp.request('https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&' +
      'listing_type=buy&page=1&callback=JSONP_CALLBACK&centre_point=51.684183,-3.431481');
  }

}




