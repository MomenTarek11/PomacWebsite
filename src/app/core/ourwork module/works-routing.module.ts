import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurWorkComponent } from 'src/app/components/our-work/our-work.component';
import { ProjectDetailsComponent } from 'src/app/components/project-details/project-details.component';

const routes: Routes = [
  { path: '', component: OurWorkComponent },
  { path: ':projectId/:projectName', component: ProjectDetailsComponent }, // ✅ بدون "/"
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksRoutingModule {}
