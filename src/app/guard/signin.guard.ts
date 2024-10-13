import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const signingGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthenticationService);
  const router = inject(Router);
  if(service.checkCookie()){
    router.navigate(['/task-manager'])
    return false;
  } else {
    return true;
  }

};
