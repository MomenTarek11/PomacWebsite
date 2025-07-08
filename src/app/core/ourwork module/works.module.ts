import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksRoutingModule } from './works-routing.module';
import { OurWorkComponent } from 'src/app/components/our-work/our-work.component';
import { ProjectDetailsComponent } from 'src/app/components/project-details/project-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/helper/error.interceptor';

@NgModule({
  declarations: [OurWorkComponent,ProjectDetailsComponent],
  imports: [CommonModule, WorksRoutingModule, CarouselModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'ar' },
  ],
})
export class WorksModule {}
