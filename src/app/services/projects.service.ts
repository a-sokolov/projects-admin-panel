import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import type { Project } from '../models/project.model';

import { PROJECTS_ENDPOINT } from './constants';
import type { ProjectDto } from './dto/project.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  /**
   * TODO: непонятно, как правильно работать с "ручками", когда нужно делать CRUD.
   * Имеется ввиду, что после удаления/добавления/редактирования разные практики
   * обновления данных локально:
   * - перечитывать с сервера, т.к. они могил в теории поменяться
   * - синхронизировать с локальной копией (текущий вариант)
   *
   * Не получилось "красиво" подвязать чтение данных на роутинг (((
   */
  projects: Project[];

  constructor(private http: HttpClient) {}

  /**
   * Получение списка всех проектов
   * */
  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(PROJECTS_ENDPOINT).pipe(
      tap((projects) => {
        this.projects = projects;
      }),
    );
  }

  /**
   * Чтение проекта по идентификатору записи
   * @param id идентификатор записи
   * */
  getById(id: string): Observable<Project> {
    return this.http.get<Project>(`${PROJECTS_ENDPOINT}/${id}`);
  }

  /**
   * Удаление проекта по идентификатору записи
   * @param id идентификатор записи
   * */
  delete(id: string): Observable<Object> {
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
  create(dto: ProjectDto): Observable<Project> {
    return this.http.post<Project>(PROJECTS_ENDPOINT, dto).pipe(
      tap((project) => {
        this.projects.push(project);
      }),
    );
  }

  /**
   * Обновление данных проекта
   * @param id идентификатор записи
   * @param dto данные с формы
   * */
  update(id: string, dto: ProjectDto): Observable<Project> {
    return this.http.put<Project>(`${PROJECTS_ENDPOINT}/${id}`, dto).pipe(
      tap((project) => {
        this.projects = this.projects.map((item) => {
          if (item.id === id) {
            return project;
          }

          return item;
        });
      }),
    );
  }
}
