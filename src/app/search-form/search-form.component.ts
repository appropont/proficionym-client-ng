import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output()
  onSearch: EventEmitter<any> = new EventEmitter();
  @Output()
  onClear: EventEmitter<any> = new EventEmitter();

  prefix = '';
  word = '';
  suffix = '';

  search(prefix, word, suffix) {
    console.log('firing search inside component', prefix, word, suffix);
    console.log('firing search inside component this:', this.prefix, this.word, this.suffix);
    this.onSearch.emit({
      prefix,
      word,
      suffix
    });
  }

  clear() {
    this.prefix = '';
    this.word = '';
    this.suffix = '';
    this.onClear.emit();
  }

  constructor() { }

  ngOnInit() {

  }

}