import {Jsonp, Response, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {COUNTRY_NAME_KEY} from "../appConfig/app.config";

@Injectable()
export class CurrentLocationsService {

  constructor(private _jsonp: Jsonp) {}

  getData(position: Position): Observable<IDataFromDto> {
    const countryKey = localStorage.getItem(COUNTRY_NAME_KEY);

    const params = this.getParams(position);

    const url = `https://api.nestoria.${countryKey}/api?`;

    const request = this._jsonp.request(url, {search: params});
    return request
      .map((data: Response) => data.json().response);
  }

  getParams(position): URLSearchParams {
    const centerPoint = `${position.coords.latitude},${position.coords.longitude}`;
    const params: URLSearchParams = new URLSearchParams();
    params.set('pretty', '1');
    params.set('action', 'search_listings');
    params.set('encoding', 'json');
    params.set('listing_type', 'buy');
    params.set('page', '1');
    params.set('callback', 'JSONP_CALLBACK');
    params.set('centre_point', centerPoint);

    return params;
  }

}









