import { Component, ElementRef, Inject, Injector, type OnDestroy, type OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import type { Subscription } from 'rxjs';

import type { ProjectDto } from '@src/app/services/dto/project.dto';
import { ProjectsService } from '@src/app/services/projects.service';
import { unsubscribeAll } from '@src/app/utils/unsubsribeAll';
import { PROJECTS_PATH } from '@src/app/constants';

import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('listRef') listRef: ElementRef<HTMLDivElement>;

  serviceSubscription?: Subscription;

  dialogSubscription?: Subscription;

  private readonly dialog = this.dialogService.open<ProjectDto>(
    new PolymorpheusComponent(EditFormComponent, this.injector),
    {
      dismissible: true,
      label: `Новый проект`,
    },
  );

  constructor(
    public projectsServices: ProjectsService,
    private router: Router,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
  ) {}

  ngOnInit(): void {
    this.serviceSubscription = this.projectsServices.getAll().subscribe();
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.serviceSubscription, this.dialogSubscription);
  }

  add(): void {
    this.dialogSubscription = this.dialog.subscribe({
      next: (dto) => {
        this.projectsServices.create(dto).subscribe(({ subject, id }) => {
          this.router.navigate([PROJECTS_PATH, id]).then(() => {
            this.alertService.open(`Создан проект "${subject}!"`, { status: TuiNotification.Info }).subscribe();
          });
        });
      },
    });
  }

  get hasItems(): boolean {
    return !!this.projectsServices.projects?.length;
  }
}
