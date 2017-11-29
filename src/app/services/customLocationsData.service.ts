import {Jsonp} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomLocationsService {

  constructor(private _jsonp: Jsonp) {}

  getData(str: string, numPage: number): any {
    return this._jsonp.request('https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&' +
      'listing_type=buy&page=' + numPage + '&callback=JSONP_CALLBACK&place_name=' + str);
  }

}
