import { TestBed } from '@angular/core/testing';

import { StatementStatesService } from './statement-states.service';

describe('StatementStatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatementStatesService = TestBed.get(StatementStatesService);
    expect(service).toBeTruthy();
  });
});
