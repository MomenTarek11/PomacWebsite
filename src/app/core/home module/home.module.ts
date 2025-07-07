import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../../components/home/home.component';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, NgxTypedJsModule, TranslateModule],
})
export class HomeModule {}
