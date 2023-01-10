import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiErrorModule, TuiFormatDatePipeModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';

import { ParseDatePipe } from '@src/app/pipes/parse-date.pipe';

import { ProjectsRoutingModule } from './projects-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';

@NgModule({
  declarations: [DashboardComponent, ListComponent, DetailsComponent, ParseDatePipe, EditFormComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    TuiButtonModule,
    TuiFormatDatePipeModule,
    FormsModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiInputDateModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputNumberModule,
    TuiAutoFocusModule,
    TuiSvgModule,
  ],
})
export class ProjectsModule {}
