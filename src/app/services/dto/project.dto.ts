import { Project } from '../../models/project.model';

/** Объект, который будем получать в сервисе для создания/обновления данных проекта */
export interface ProjectDto extends Omit<Project, 'id'> {}
