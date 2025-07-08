import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from 'src/app/components/jobs/jobs.component';
import { JobDetailsComponent } from 'src/app/components/job-details/job-details.component';

@NgModule({
  declarations: [JobsComponent , JobDetailsComponent],
  imports: [CommonModule, JobsRoutingModule],
})
export class JobsModule {}
