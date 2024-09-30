import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { signingGuard } from './signin.guard';

describe('signinGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => signingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
