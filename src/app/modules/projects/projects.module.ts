import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [DashboardComponent, ListComponent, DetailsComponent],
  imports: [CommonModule, ProjectsRoutingModule],
})
export class ProjectsModule {}
