import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("hello11");
    const accessToken: any = localStorage.getItem('user');
    if (req.headers.get('skip')) return next.handle(req);

    if (accessToken) {
        console.log("hello");
      const cloned = req.clone({
        headers: req.headers.set('Authorization', "Bearer " + accessToken),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
