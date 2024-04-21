import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { environment } from '../environments/environment';

const dbConfig: DBConfig = environment.dbConfig;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig)),
  ],
};
