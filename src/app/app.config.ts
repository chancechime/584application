import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { routes } from "./app.routes";
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from "./auth/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: 
  [provideZoneChangeDetection({ eventCoalescing: true}), 
    provideRouter(routes), 
    provideHttpClient(withInterceptors([authInterceptor])), 
    provideAnimationsAsync()]
  };
