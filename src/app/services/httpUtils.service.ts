import {Injectable} from '@angular/core';

@Injectable()
export class HttpUtils {
  getParams(paramsObj: any): string {
    return Object.keys(paramsObj)
      .map(key => `${key}=${paramsObj[key]}`)
      .join('&');
  }
}
