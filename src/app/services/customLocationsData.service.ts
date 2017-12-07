import {Jsonp, Response, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {COUNTRY_NAME_KEY} from "../appConfig/app.config";

@Injectable()
export class CustomLocationsService {

  constructor(private _jsonp: Jsonp) {}

  getData(str: string, numPage: number): Observable<IDataFromDto> {
    const countryKey = localStorage.getItem(COUNTRY_NAME_KEY);
    const url = `https://api.nestoria.${countryKey}/api?`;
    const params = this.getParams(str, numPage);
    const request =this._jsonp.request(url, {search: params});
    return request
      .map((data: Response) => data.json().response);
  }

  getParams(str, numPage): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
    params.set('pretty', '1');
    params.set('action', 'search_listings');
    params.set('encoding', 'json');
    params.set('listing_type', 'buy');
    params.set('page', numPage);
    params.set('callback', 'JSONP_CALLBACK');
    params.set('place_name', str);

    return params;
  }

}
