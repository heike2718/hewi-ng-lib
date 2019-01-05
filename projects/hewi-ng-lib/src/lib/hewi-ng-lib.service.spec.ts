import { TestBed } from '@angular/core/testing';

import { HewiNgLibService } from './hewi-ng-lib.service';

describe('HewiNgLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HewiNgLibService = TestBed.get(HewiNgLibService);
    expect(service).toBeTruthy();
  });
});
