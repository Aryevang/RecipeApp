import { TestBed } from '@angular/core/testing';

import { ShopingServiceService } from './shoping-service.service';

describe('ShopingServiceService', () => {
  let service: ShopingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
