import { Inject, Injectable, Injector, OnDestroy, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription, switchMap, tap } from 'rxjs';

import type { Project } from '@src/app/models/project.model';
import type { ProjectDto } from '@src/app/services/dto/project.dto';
import { ProjectsService } from '@src/app/services/projects.service';
import { unsubscribeAll } from '@src/app/utils/unsubsribeAll';
import { PROJECTS_PATH } from '@src/app/constants';

import { EditFormComponent } from '../components/edit-form/edit-form.component';

@Injectable({
  providedIn: 'root',
})
export class EditProjectService implements OnDestroy {
  private dialogSubscription?: Subscription;

  private confirmSubscription?: Subscription;

  private readonly dialog = this.dialogService.open<ProjectDto>(
    new PolymorpheusComponent(EditFormComponent, this.injector),
    {
      dismissible: true,
      label: `Новый проект`,
    },
  );

  constructor(
    private router: Router,
    private projectsService: ProjectsService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
  ) {}

  ngOnDestroy(): void {
    unsubscribeAll(this.dialogSubscription, this.confirmSubscription);
  }

  add(): void {
    this.dialogSubscription = this.dialog.subscribe({
      next: (dto) => {
        this.projectsService.create(dto).subscribe(({ subject, id }) => {
          this.router.navigate([PROJECTS_PATH, id]).then(() => {
            this.alertService.open(`Создан проект "${subject}!"`, { status: TuiNotification.Info }).subscribe();
          });
        });
      },
    });
  }

  confirmDelete(content: TemplateRef<TuiDialogContext<void>>): void {
    this.confirmSubscription = this.dialogService.open(content, { dismissible: true }).subscribe();
  }

  delete(project: Project): void {
    if (this.confirmSubscription) {
      this.confirmSubscription.unsubscribe();
    }

    this.projectsService.delete(project.id).subscribe(() => {
      const { projects } = this.projectsService;
      const commands = projects.length > 0 ? [PROJECTS_PATH, projects[0].id] : [PROJECTS_PATH];

      this.router.navigate(commands).then(() => {
        this.alertService.open(`Проект "${project.subject}" удален!`, { status: TuiNotification.Warning }).subscribe();
      });
    });
  }

  edit(project: Project): Observable<Project> {
    const dialog = this.dialogService.open<ProjectDto>(new PolymorpheusComponent(EditFormComponent, this.injector), {
      data: project,
      dismissible: true,
      label: project.subject,
    });

    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }

    return dialog.pipe(
      switchMap((dto) => {
        return this.projectsService.update(project.id, dto).pipe(
          tap(() => {
            this.alertService
              .open(`Проект "${project.subject}" был изменен!`, { status: TuiNotification.Warning })
              .subscribe();
          }),
        );
      }),
    );
  }
}
