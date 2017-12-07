import {Injectable} from '@angular/core';

@Injectable()
export class HttpUtils {
  getParams(paramsObj): string {
    return Object.keys(paramsObj)
      .map(key => `${key}=${paramsObj[key]}`)
      .join('&');
  }
}
