/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SynonymsService } from './synonyms.service';

describe('SynonymsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SynonymsService]
    });
  });

  it('should ...', inject([SynonymsService], (service: SynonymsService) => {
    expect(service).toBeTruthy();
  }));
});
