import {Jsonp, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {COUNTRY_NAME_KEY} from "../appConfig/app.config";
import {HttpUtils} from "./httpUtils.service";

@Injectable()
export class CustomLocationsService {

  constructor(private _jsonp: Jsonp, private httpUtils: HttpUtils) {}

  getData(str: string, numPage: number): Observable<IDataFromDto> {
    const countryKey = localStorage.getItem(COUNTRY_NAME_KEY);
    const params = this.httpUtils.getParams({
      pretty: '1',
      action: 'search_listings',
      encoding: 'json',
      listing_type: 'buy',
      page: encodeURIComponent(numPage.toString()),
      callback: 'JSONP_CALLBACK',
      place_name: str
    });

    const url = `https://api.nestoria.${countryKey}/api?${params}`;
    const request =this._jsonp.request(url);
    return request
      .map((data: Response) => data.json().response);
  }

}
