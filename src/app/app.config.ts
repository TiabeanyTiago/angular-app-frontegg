import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { FronteggAppOptions } from "@frontegg/types";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { FronteggAppModule } from "@frontegg/angular";

const fronteggConfig: FronteggAppOptions = {
  contextOptions: {
    baseUrl: "https://app-695zxhovk030.frontegg.com",
    clientId: "b627fe8b-106c-46fc-83bc-ae336178fe75",
  },
  authOptions: {
    // keepSessionAlive: true // Uncomment this in order to maintain the session alive
  },
  hostedLoginBox: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FronteggAppModule.forRoot(fronteggConfig)),
  ],
};
