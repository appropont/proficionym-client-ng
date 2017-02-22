import { Component } from '@angular/core';

import { SynonymsService } from './synonyms.service';
import { DomainsService } from './domains.service';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proficionym';
  
  registered = [];
  available = [];
  errored = [];

  searchStarted = false;
  requests = [];

  activeSearch = null;

  constructor(private synonymsService: SynonymsService, private domainsService: DomainsService) { }

  startSearch(values) {
    let { prefix, word, suffix } = values;
    if(!prefix) {
      prefix = '';
    }
    if(!suffix) {
      suffix = '';
    }
    this.searchStarted = true;
    console.log('values in startSearch', values);
    this.activeSearch = this.synonymsService.lookup(word).subscribe(
      synonyms => {
        console.log('synonyms: ', synonyms);
        const requests = [];
        synonyms.map((synonym) => {
          requests.push(this.domainsService.lookup(`${prefix}${synonym}${suffix}.com`));
        });
        this.activeSearch = Observable.forkJoin(requests).subscribe(results => {
          console.log('results', results);
          this.available = [];
          this.registered = [];
          this.errored = [];
          results.map((result) => {
            if(result["status"] === "registered") {
              this.registered.push(result["domain"]);
            } else if(result["status"] === "available") {
              this.available.push(result["domain"]);
            } else {
              this.errored.push(result["domain"]);
            }
          })
        })
      },
      errors => {
        console.log('errors in synyonyms subscription: ', errors);
      }
    );
  }

  clearSearch() {
    this.searchStarted = false;
    this.registered = [];
    this.available = [];
    this.errored = [];
  }

  stopSearch() {
    console.log('values in stopSearch');

  }

}
