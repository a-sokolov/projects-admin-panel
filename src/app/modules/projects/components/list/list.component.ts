import { Component, Input } from '@angular/core';
import type { Project } from '@src/app/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() projects: Project[] = [];
}
