import { Component, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, type Subscription, switchMap } from 'rxjs';
import { ProjectsService } from '@src/app/services/projects.service';
import type { Project } from '@src/app/models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  project?: Project;

  projectSubscription: Subscription;

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService, private router: Router) {}

  ngOnInit(): void {
    this.projectSubscription = this.route.params
      .pipe(
        map((p) => p['id']),
        switchMap((id) => this.projectsService.getById(id)),
      )
      .subscribe((project) => {
        this.project = project;
      });
  }

  ngOnDestroy(): void {
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }

  handleDelete(id: number) {
    this.projectsService.delete(id).subscribe(() => {
      this.router.navigate(['projects']);
    });
  }
}
