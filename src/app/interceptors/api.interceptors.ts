import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiInterceptors: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('https://') && !req.url.startsWith('http://')) {
    const reqClone = req.clone({ url: environment.apiUrl + req.url });
    return next(reqClone);
  }
  return next(req);
};
