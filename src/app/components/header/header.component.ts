import { Component } from '@angular/core';
import { HOME_PATH, PROJECTS_PATH } from '@src/app/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  links: string[] = [HOME_PATH, PROJECTS_PATH];
}
