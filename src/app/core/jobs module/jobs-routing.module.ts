import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailsComponent } from 'src/app/components/job-details/job-details.component';
import { JobsComponent } from 'src/app/components/jobs/jobs.component';

const routes: Routes = [
  { path: '', component: JobsComponent },
  { path: ':job_id', component: JobDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
