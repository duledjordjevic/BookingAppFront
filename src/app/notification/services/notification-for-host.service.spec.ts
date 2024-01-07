import { TestBed } from '@angular/core/testing';

import { NotificationForHostService } from './notification-for-host.service';

describe('NotificationForHostService', () => {
  let service: NotificationForHostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationForHostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
