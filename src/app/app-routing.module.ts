// import { JobsComponent } from './components/jobs/jobs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AppComponent } from './app.component';
// import { AboutComponent } from './components/about/about.component';
// import { ContactUsComponent } from './components/contact-us/contact-us.component';
// import { HomeComponent } from './components/home/home.component';
// import { OurWorkComponent } from './components/our-work/our-work.component';
// import { ProjectDetailsComponent } from './components/project-details/project-details.component';
// import { ServicesComponent } from './components/our-services/services.component';
// import { FaqComponent } from './components/faq/faq.component';
// import { BlogComponent } from './components/blog/blog.component';
// import { BlogDatailsComponent } from './components/blog-datails/blog-datails.component';
// import { JobDetailsComponent } from './components/job-details/job-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./core/home module/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./core/blog module/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./core/jobs module/jobs.module').then((m) => m.JobsModule),
  },
  {
    path: 'our-work',
    loadChildren: () =>
      import('./core/ourwork module/works.module').then((m) => m.WorksModule),
  },
  {
    path: 'our-services',
    loadChildren: () =>
      import('./core/services module/services.module').then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./core/faq module/faq.module').then((m) => m.FaqModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
