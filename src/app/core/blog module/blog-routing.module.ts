import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDatailsComponent } from 'src/app/components/blog-datails/blog-datails.component';
import { BlogComponent } from 'src/app/components/blog/blog.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: ':blog_id', component: BlogDatailsComponent }, // بدون blog/ تاني
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
