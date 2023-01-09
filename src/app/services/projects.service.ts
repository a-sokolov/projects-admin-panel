import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

import type { Project } from '../models';

import { PROJECTS_ENDPOINT } from './constants';
import type { ProjectDto } from './dto/project.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects: Project[];

  constructor(private http: HttpClient) {}

  /**
   * Получение списка всех проектов
   * */
  getAll() {
    return this.http.get<Project[]>(PROJECTS_ENDPOINT).subscribe((projects) => {
      this.projects = projects;
    });
  }

  /**
   * Чтение проекта по идентификатору записи
   * @param id идентификатор записи
   * */
  getById(id: number) {
    return this.http.get<Project>(`${PROJECTS_ENDPOINT}/${id}`);
  }

  /**
   * Удаление проекта по идентификатору записи
   * @param id идентификатор записи
   * */
  delete(id: number) {
    return this.http.delete(`${PROJECTS_ENDPOINT}/${id}`).pipe(
      tap(() => {
        this.projects = this.projects.filter((project) => project.id !== id);
      }),
    );
  }

  /**
   * Создание нового проекта
   * @param dto данные с формы
   * */
  create(dto: ProjectDto) {
    return this.http.post<Project>(PROJECTS_ENDPOINT, dto);
  }

  /**
   * Обновление данных проекта
   * @param id идентификатор записи
   * @param dto данные с формы
   * */
  update(id: number, dto: ProjectDto) {
    return this.http.post<Project>(`${PROJECTS_ENDPOINT}/${id}`, dto);
  }
}
