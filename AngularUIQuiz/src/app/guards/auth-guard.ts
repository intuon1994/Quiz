import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.IsLoggedIn()) {
   // console.log("auth.IsLoggedIn(): ",auth.IsLoggedIn());
    return true;

  } else {

    alert("Please login first!");
    router.navigate(['login']);
    return false;
  }
};
