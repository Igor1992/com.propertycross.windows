import {Jsonp, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpUtils} from "./httpUtils.service";

@Injectable()
export class CurrentLocationsService {

  constructor(private _jsonp: Jsonp, private httpUtils: HttpUtils) {}

  getData(codeCountry: string, position: Position): Observable<IDataFromDto> {
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

    const url = `https://api.nestoria.${codeCountry}/api?${params}`;

    const request = this._jsonp.request(url);
    return request
      .map((data: Response) => data.json().response);
  }
}









