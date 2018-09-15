import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { config } from './config';

@Injectable()
export class SynonymsService {

  constructor(private http: HttpClient) { }

  lookup(word) {
    console.log('lookup called in synonyms service with word: ', word);
    return this.http.get(`${config.apiDomain}/synonyms/${word}`)
      .pipe(map((res) => {
        return (res as any).synonyms || [];
      }));
  }

}
