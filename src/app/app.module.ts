import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HighchartsChartModule} from 'highcharts-angular';
import { ChartComponent } from './chart/chart.component';
import {loadInContextEditor} from './load-in-context-editor';

const doUseInContextEditor = true;

export class CustomMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return doUseInContextEditor ? `{{__phrase_${params.key}__}}` : params.key;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HighchartsChartModule,
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CustomMissingTranslationHandler
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: translateInitializer,
      deps: [TranslateService, HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function translateInitializer(translateService: TranslateService, http: HttpClient): () => Promise<void> {
  return async () => {
    const locale = 'en';
    translateService.use(locale);

    if (doUseInContextEditor) {
      loadInContextEditor();
    } else {
      const translationsUrl = `./assets/i18n/${locale}.json`;
      const translations = await http.get(translationsUrl).toPromise();
      translateService.setTranslation('en', translations, false);
    }

  };
}
