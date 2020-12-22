import { TestBed } from '@angular/core/testing';

import { TempUnitUpdateService } from './temp-unit-update.service';

describe('TempUnitUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempUnitUpdateService = TestBed.get(TempUnitUpdateService);
    expect(service).toBeTruthy();
  });
});
