import { JobsComponent } from './components/jobs/jobs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { OurWorkComponent } from './components/our-work/our-work.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ServicesComponent } from './components/our-services/services.component';
import { FaqComponent } from './components/faq/faq.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDatailsComponent } from './components/blog-datails/blog-datails.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'blog/:blog_id', component: BlogDatailsComponent },
  { path: 'jobs/:job_id', component: JobDetailsComponent },
  { path: 'our-work', component: OurWorkComponent },
  { path: 'our-services', component: ServicesComponent },
  // {path:'contact-us', component:ContactUsComponent},
  { path: 'faq', component: FaqComponent },
  {
    path: 'our-work/:project-id/:project-name',
    component: ProjectDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
