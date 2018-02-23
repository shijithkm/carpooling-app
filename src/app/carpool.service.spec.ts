import { TestBed, inject } from '@angular/core/testing';

import { CarpoolService } from './carpool.service';

describe('CarpoolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarpoolService]
    });
  });

  it('should be created', inject([CarpoolService], (service: CarpoolService) => {
    expect(service).toBeTruthy();
  }));
});
