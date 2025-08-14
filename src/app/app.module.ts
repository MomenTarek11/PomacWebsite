import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import * as Popper from '@popperjs/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AboutComponent } from './components/about/about.component';
import { OurWorkComponent } from './components/our-work/our-work.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { RouterModule } from '@angular/router';
import { ErrorInterceptor } from './helper/error.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { ServicesComponent } from './components/our-services/services.component';
import { FaqComponent } from './components/faq/faq.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDatailsComponent } from './components/blog-datails/blog-datails.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { HeroComponent } from './components/hero/hero.component';
import { RecomendedBlogsComponent } from './components/blog-datails/recomended-blogs/recomended-blogs.component';
import { ProccessComponent } from './components/home/proccess/proccess.component';
import { SwiperModule } from 'swiper/angular';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ChoosenBlogsComponent } from './components/home/choosen-blogs/choosen-blogs.component';
import { ProjectsComponent } from './components/home/projects/projects.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
registerLocaleData(localeAr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // AboutComponent,
    OurWorkComponent,
    // ContactUsComponent,
    ProjectDetailsComponent,
    WhatsappComponent,
    ServicesComponent,
    FaqComponent,
    BlogComponent,
    BlogDatailsComponent,
    JobsComponent,
    JobDetailsComponent,
    HeroComponent,
    RecomendedBlogsComponent,
    ProccessComponent,
    CarouselComponent,
    ChoosenBlogsComponent,
    ProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CarouselModule,
    BrowserAnimationsModule,
    RouterModule,
    // RouterModule.forRoot([], {
    //   scrollPositionRestoration: 'enabled',
    //   anchorScrolling: 'enabled',
    //   scrollOffset: [0, 100],
    // }),
    SwiperModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxTypedJsModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'ar' },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
