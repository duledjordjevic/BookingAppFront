import { TestBed } from '@angular/core/testing';

import { ReportUserService } from './report-user.service';

describe('ReportUserService', () => {
  let service: ReportUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
