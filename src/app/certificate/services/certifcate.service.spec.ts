import { TestBed } from '@angular/core/testing';

import { CertifcateService } from './certifcate.service';

describe('CertifcateService', () => {
  let service: CertifcateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertifcateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
