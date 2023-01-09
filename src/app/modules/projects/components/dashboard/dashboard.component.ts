import { Component, type OnDestroy, type OnInit } from '@angular/core';
import type { Subscription } from 'rxjs';

import { ProjectsService } from '@src/app/services/projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  serviceSubscription: Subscription;

  constructor(public projectsServices: ProjectsService) {}

  ngOnInit(): void {
    this.serviceSubscription = this.projectsServices.getAll();
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }
}
