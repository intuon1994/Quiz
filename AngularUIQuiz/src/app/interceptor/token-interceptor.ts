import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const myToken = auth.GetToken();

  if(myToken){
    req = req.clone({
       setHeaders: {Authorization:`Bearer ${myToken}`}
    })
  }


  return next(req).pipe(
    catchError((err: any) => {

      if (err instanceof HttpErrorResponse) {

        if (err.status === 401) {
          alert("Token is expired, please login again.");
          //router.navigate(['login']);
          auth.LogOut();
        }
      }
     return throwError(()=> new Error("Some other error occured"));
    })
  );
};
