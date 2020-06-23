import { TestBed } from '@angular/core/testing';

import { UserstoriesApiService } from './userstories-api.service';

describe('UserstoriesApiService', () => {
  let service: UserstoriesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserstoriesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
