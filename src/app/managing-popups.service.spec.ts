/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManagingPopupsService } from './managing-popups.service';

describe('ManagingPopupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagingPopupsService]
    });
  });

  it('should ...', inject([ManagingPopupsService], (service: ManagingPopupsService) => {
    expect(service).toBeTruthy();
  }));
});
