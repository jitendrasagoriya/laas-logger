import { TestBed } from '@angular/core/testing';

import { OwnloggerService } from './ownlogger.service';

describe('OwnloggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OwnloggerService = TestBed.get(OwnloggerService);
    expect(service).toBeTruthy();
  });
});
