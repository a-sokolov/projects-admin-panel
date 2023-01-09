import { Project } from '../../models';

/** Объект, который будем получать в сервисе для создания/обновления данных проекта */
export interface ProjectDto extends Omit<Project, 'id'> {}
