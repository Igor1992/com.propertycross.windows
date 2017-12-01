import {Jsonp, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {countryNameKey} from "../appConfig/app.config";

@Injectable()
export class CustomLocationsService {

  constructor(private _jsonp: Jsonp) {}

  getData(str: string, numPage: number): Observable<IDataFromDto> {
    const countryKey = localStorage.getItem(countryNameKey);
    const request =this._jsonp.request(`https://api.nestoria.${countryKey}/api?pretty=1&action=search_listings&encoding=json&' +
      'listing_type=buy&page=${numPage}&callback=JSONP_CALLBACK&place_name=${str}`);
    return request
      .map((data: Response) => data.json().response);
  }

}
