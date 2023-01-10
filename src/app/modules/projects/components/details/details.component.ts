import { Component, Inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { tuiIconTransparentLarge } from '@taiga-ui/icons';
import { catchError, EMPTY, map, type Subscription, switchMap } from 'rxjs';

import type { Project } from '@src/app/models/project.model';
import { ProjectsService } from '@src/app/services/projects.service';
import { unsubscribeAll } from '@src/app/utils/unsubsribeAll';

import { EditProjectService } from '../../services/edit-project.service';
import { scrollToProjectElement } from '../../utils/scrollToProjectElement';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  project?: Project;

  private projectSubscription?: Subscription;

  readonly tuiIconTransparentLarge = this.sanitizer.bypassSecurityTrustHtml(tuiIconTransparentLarge);

  constructor(
    private route: ActivatedRoute,
    public projectsService: ProjectsService,
    public editProjectService: EditProjectService,
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
  ) {}

  ngOnInit(): void {
    this.projectSubscription = this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) =>
          this.projectsService.getById(id).pipe(
            catchError((error) => {
              this.alertService
                .open(`Ошибка чтения данных: ${error.message}`, { status: TuiNotification.Error })
                .subscribe();

              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe((project) => {
        scrollToProjectElement(project);

        this.project = project;
      });
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.projectSubscription, this.projectSubscription);
  }

  delete() {
    if (!this.project) {
      return;
    }

    this.editProjectService.delete(this.project);
  }

  edit() {
    if (!this.project) {
      return;
    }

    this.editProjectService.edit(this.project).subscribe((project) => {
      this.project = project;
    });
  }
}
