import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input()
  registered = [];
  @Input()
  available = [];
  @Input()
  errored = [];

  constructor() { }

  ngOnInit() {
  }

}
