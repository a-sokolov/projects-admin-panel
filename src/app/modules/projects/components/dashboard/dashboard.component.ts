import { Component, type OnDestroy, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { type Subscription } from 'rxjs';

import { ProjectsService } from '@src/app/services/projects.service';
import { unsubscribeAll } from '@src/app/utils/unsubsribeAll';

import { EditProjectService } from '../../services/edit-project.service';
import { PROJECTS_PATH } from '@src/app/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private serviceSubscription?: Subscription;

  constructor(
    private router: Router,
    public projectsService: ProjectsService,
    public editProjectService: EditProjectService,
  ) {}

  ngOnInit(): void {
    this.serviceSubscription = this.projectsService.getAll().subscribe((projects) => {
      if (this.router.url.endsWith(`/${PROJECTS_PATH}`)) {
        const [project] = projects;
        this.router.navigate(['/', PROJECTS_PATH, project.id]).then();
      }
    });
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.serviceSubscription);
  }

  get hasItems(): boolean {
    return !!this.projectsService.projects?.length;
  }
}
