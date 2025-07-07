import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from 'src/app/components/blog/blog.component';
import { BlogDatailsComponent } from 'src/app/components/blog-datails/blog-datails.component';

@NgModule({
  declarations: [BlogComponent, BlogDatailsComponent],
  imports: [CommonModule, BlogRoutingModule, DatePipe],
})
export class BlogModule {}
