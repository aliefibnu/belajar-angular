import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import localeId from '@angular/common/locales/id';
import { provideRouter } from '@angular/router';
import { routes } from './routes/app.routes';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptors } from './interceptors/api.interceptors';

registerLocaleData(localeId);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'id_ID' },
    provideHttpClient(withInterceptors([apiInterceptors])),
  ],
};
