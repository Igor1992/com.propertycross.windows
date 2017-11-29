import {Jsonp, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {DataLocations} from "../dataLocations";


@Injectable()
export class CurrentLocationsService {

  constructor(private _jsonp: Jsonp) {}

  getData(): Observable<IDataLocationsDto> {
    return this._jsonp.request<Response>('https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&' +
      'listing_type=buy&page=1&callback=JSONP_CALLBACK&centre_point=51.684183,-3.431481')
      .map<IDataLocationsDto>((data: Response) => JSON.parse(data.text()))
      .map<DataLocations>(dataLoc => {return dataLoc.response});
  }
}




