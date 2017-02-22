import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { config } from './config';

@Injectable()
export class DomainsService {

  constructor(private http: Http) { }

  lookup(domain) {
    console.log('lookup called in service with domain: ', domain);
    return this.http.get(`${config.apiDomain}/whois/${domain}`).map((res) => {
      return res.json() || {
        domain: 'domain',
        status: 'error'
      };
    });
  }

}
