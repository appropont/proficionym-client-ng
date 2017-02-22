import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { config } from './config';

@Injectable()
export class SynonymsService {

  constructor(private http: Http) { }

  lookup(word) {
    console.log('lookup called in synonyms service with word: ', word);
    return this.http.get(`${config.apiDomain}/synonyms/${word}`).map((res) => {
      return res.json().synonyms || [];
    });
  }

}
