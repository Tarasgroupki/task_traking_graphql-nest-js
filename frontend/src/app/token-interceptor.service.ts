import { HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpInterceptor } from '@angular/common/http';
import { setContext } from 'apollo-link-context';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenizedReq = setContext((_, { headers }) => {
      return {
        headers: headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      };
    });
    return null;
  }
}
