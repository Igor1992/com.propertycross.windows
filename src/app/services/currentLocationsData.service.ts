import {Jsonp, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {COUNTRY_NAME_KEY} from "../appConfig/app.config";

@Injectable()
export class CurrentLocationsService {

  constructor(private _jsonp: Jsonp) {}

  getData(position: Position): Observable<IDataFromDto> {
      const centerPoint = `${position.coords.latitude},${position.coords.longitude}`;

      const countryKey = localStorage.getItem(COUNTRY_NAME_KEY);
      const url = `https://api.nestoria.${countryKey}/api?pretty=1&action=search_listings&encoding=json&` +
        `listing_type=buy&page=1&callback=JSONP_CALLBACK&centre_point=${centerPoint}`;

      const request = this._jsonp.request(url);
      return request
        .map((data: Response) => data.json().response);
  }

}




