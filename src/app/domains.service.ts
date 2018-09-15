import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { config } from './config';

@Injectable()
export class DomainsService {

  constructor(private http: HttpClient) { }

  lookup(domain) {
    console.log('lookup called in service with domain: ', domain);
    return this.http.get(`${config.apiDomain}/whois/${domain}`)
    .pipe(map((res) => {
      return res || {
        domain: 'domain',
        status: 'error'
      };
    }));
  }

}
