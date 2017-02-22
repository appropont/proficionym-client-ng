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
  searchProgress = 0;

  activeSearch = null;

  constructor(private synonymsService: SynonymsService, private domainsService: DomainsService) { }

  startSearch(values) {
    this.stopSearch();
    let { prefix, word, suffix } = values;
    if(!prefix) {
      prefix = '';
    }
    if(!suffix) {
      suffix = '';
    }
    this.searchStarted = true;
    this.searchProgress = 0;
    this.available = [];
    this.registered = [];
    this.errored = [];
    this.activeSearch = this.synonymsService.lookup(word).subscribe(
      synonyms => {
        const synonymsCount = synonyms.length;
        let lookupsCompleted = 0;
        synonyms.map((synonym) => {
          this.requests.push(this.domainsService.lookup(`${prefix}${synonym}${suffix}.com`).subscribe(result => {
            lookupsCompleted += 1;
            this.searchProgress = Math.floor(lookupsCompleted / synonymsCount * 100);
            if(result["status"] === "registered") {
              this.registered.push(result["domain"]);
            } else if(result["status"] === "available") {
              this.available.push(result["domain"]);
            } else {
              this.errored.push(result["domain"]);
            }
          }));
        });
      },
      errors => {
        console.log('errors in synyonyms subscription: ', errors);
      }
    );
  }

  clearSearch() {
    this.stopSearch();
    this.searchStarted = false;
    this.registered = [];
    this.available = [];
    this.errored = [];
    this.searchProgress = 0;
  }

  stopSearch() {
    console.log('values in stopSearch');
    this.requests.map(request => {
      request.unsubscribe();
    });
  }

}
