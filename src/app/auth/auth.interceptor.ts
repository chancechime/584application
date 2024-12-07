import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const token = localStorage.getItem("LoginToken");

  req = req.clone(
    {
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })

  return next(req).pipe(
    catchError(error => {
    if (error instanceof HttpErrorResponse && error.status == 401) {
      router.navigate(['/login']);
    }
      return throwError(() => error);
  })
  );
  
};
