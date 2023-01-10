import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HOME_PATH, PROJECTS_PATH } from './constants';

const routes: Routes = [
  { path: '', redirectTo: `/${HOME_PATH}`, pathMatch: 'full' },
  { path: HOME_PATH, component: HomeComponent },
  {
    path: PROJECTS_PATH,
    loadChildren: () => import('./modules/projects/projects.module').then((module) => module.ProjectsModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
