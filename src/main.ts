import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function apiURL(){
	return "https://ng-recipe-training-default-rtdb.firebaseio.com/"
}

export function baseURL(){
	return document.getElementsByTagName('base')[0].href
}

//@Inject('XX_XX') private varName
const providers = [
	{ provide: 'API_URL', useFactory: apiURL, deps: [] },
	{ provide: 'BASE_URL', useFactory: baseURL, deps: [] }
]


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
