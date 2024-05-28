import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'src/app/keycloak/keycloak.service';
import * as DOMPurify from 'dompurify';
import { SanitizationService } from 'src/app/security/sanitization.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService,
            private sanitizationService : SanitizationService){}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken: any = this.keycloakService.keycloak.token;
    // const accessToken: any = localStorage.getItem('user');
    if (req.headers.get('skip')) return next.handle(req);

    const sanitizedUrl = DOMPurify.sanitize(req.url);

    let clonedReq = req.clone({ url: sanitizedUrl });

    if (accessToken) {
        clonedReq = clonedReq.clone({
        headers: req.headers.set('Authorization', "Bearer " + accessToken),
      });

      return next.handle(clonedReq);
    } else {
      return next.handle(req);
    }
  }
}
