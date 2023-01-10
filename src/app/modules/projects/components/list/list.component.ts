import { Component, Input } from '@angular/core';

import type { Project } from '@src/app/models/project.model';
import { PROJECTS_PATH } from '@src/app/constants';

import { generateItemId } from '../../utils/generateItemId';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  projectsPath = PROJECTS_PATH;

  @Input() projects: Project[] = [];

  generateItemId(id: string): string {
    return generateItemId(id);
  }
}
