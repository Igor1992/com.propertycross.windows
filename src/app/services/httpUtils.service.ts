import {Injectable} from '@angular/core';

@Injectable()
export class HttpUtils {
  getParams(paramsObj): string {
    let str = "";
    for (let key in paramsObj) {
      if (str != "") {
        str += "&";
      }
      str += key + "=" + paramsObj[key];
    }
    debugger;
    return str;
  }
}
