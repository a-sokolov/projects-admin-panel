import { Component, Inject, Injector, type OnDestroy, type OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, type Subscription, switchMap } from 'rxjs';
import { TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import type { Project } from '@src/app/models';
import type { ProjectDto } from '@src/app/services/dto/project.dto';
import { ProjectsService } from '@src/app/services/projects.service';

import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  project?: Project;

  private projectSubscription?: Subscription;

  private dialogSubscription?: Subscription;

  private confirmSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
  ) {}

  ngOnInit(): void {
    this.projectSubscription = this.route.params
      .pipe(
        map((p) => p['id']),
        switchMap((id) => this.projectsService.getById(id)),
      )
      .subscribe((project) => {
        const el = document.getElementById(`project-${project.id}`);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 0);
        }
        this.project = project;
      });
  }

  ngOnDestroy(): void {
    [this.projectSubscription, this.projectSubscription, this.dialogSubscription].forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  edit() {
    if (!this.project) {
      return;
    }

    const dialog = this.dialogService.open<ProjectDto>(new PolymorpheusComponent(EditFormComponent, this.injector), {
      data: this.project,
      dismissible: true,
      label: this.project.subject,
    });

    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }

    this.dialogSubscription = dialog.subscribe({
      next: (dto) => {
        if (this.project) {
          this.projectsService.update(this.project.id, dto).subscribe((data) => {
            this.project = data;

            this.alertService
              .open(`Проект "${this.project?.subject}" был изменен!`, { status: TuiNotification.Warning })
              .subscribe();
          });
        }
      },
    });
  }

  confirmDelete(content: TemplateRef<TuiDialogContext<void>>): void {
    this.confirmSubscription = this.dialogService.open(content, { dismissible: true }).subscribe();
  }

  delete() {
    if (this.confirmSubscription) {
      this.confirmSubscription.unsubscribe();
    }

    if (!this.project?.id) {
      return;
    }

    this.projectsService.delete(this.project.id).subscribe(() => {
      const { projects } = this.projectsService;
      const commands = projects.length > 0 ? ['projects', projects[0].id] : ['projects'];

      this.router.navigate(commands).then(() => {
        this.alertService
          .open(`Проект "${this.project?.subject}" удален!`, { status: TuiNotification.Warning })
          .subscribe();
      });
    });
  }
}
