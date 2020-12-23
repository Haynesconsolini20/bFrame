import { TestBed } from '@angular/core/testing';

import { TwitterserviceService } from './twitterservice.service';

describe('TwitterserviceService', () => {
  let service: TwitterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
