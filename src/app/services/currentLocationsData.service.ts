import {Jsonp, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {COUNTRY_NAME_KEY} from "../appConfig/app.config";
import {HttpUtils} from "../services/httpUtils.service";

@Injectable()
export class CurrentLocationsService {

  constructor(private _jsonp: Jsonp, private httpUtils: HttpUtils) {}

  getData(position: Position): Observable<IDataFromDto> {
    const countryKey = localStorage.getItem(COUNTRY_NAME_KEY);
    const centerPoint = `${position.coords.latitude},${position.coords.longitude}`;

    const params = this.httpUtils.getParams({
      pretty: '1',
      action: 'search_listings',
      encoding: 'json',
      listing_type: 'buy',
      page: '1',
      callback: 'JSONP_CALLBACK',
      centre_point: centerPoint
    });

    const url = `https://api.nestoria.${countryKey}/api?${params}`;

    const request = this._jsonp.request(url);
    return request
      .map((data: Response) => data.json().response);
  }
}









