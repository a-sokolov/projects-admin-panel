import { ChangeDetectionStrategy, Component, Inject, type OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { type TuiDialogContext } from '@taiga-ui/core';
import { TuiDay } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import type { ProjectDto } from '@src/app/services/dto/project.dto';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormComponent implements OnInit {
  min = new TuiDay(2000, 1, 1);

  max = TuiDay.currentLocal();

  form = new FormGroup({
    subject: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    createdBy: new FormControl('', Validators.required),
    startDate: new FormControl(TuiDay.fromLocalNativeDate(new Date()), Validators.required),
    endDate: new FormControl(TuiDay.fromLocalNativeDate(new Date()), Validators.required),
    cost: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
  });

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<ProjectDto, ProjectDto>,
  ) {}

  ngOnInit(): void {
    if (this.context.data) {
      const { startDate, endDate, ...rest } = this.context.data;

      this.form.reset({
        ...rest,
        startDate: TuiDay.fromUtcNativeDate(new Date(startDate)),
        endDate: TuiDay.fromUtcNativeDate(new Date(endDate)),
      });
    }
  }

  get isValid(): boolean {
    return this.form.valid && this.form.touched && this.form.dirty;
  }

  submit(): void {
    if (this.form.valid) {
      const { startDate, endDate, ...rest } = this.form.value;

      const dto = {
        ...rest,
        // TODO: неясно как правильно работаем с датами
        startDate: startDate?.toUtcNativeDate().toISOString(),
        endDate: endDate?.toUtcNativeDate().toISOString(),
      };

      this.context.completeWith(dto as ProjectDto);
    }
  }
}
