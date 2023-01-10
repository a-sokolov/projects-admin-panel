import type { Project } from '@src/app/models/project.model';

import { generateItemId } from './generateItemId';

/**
 * Утилита для перевода фокуса на элемент в списке.
 * @param project проект, который нужно найти
 * */
export const scrollToProjectElement = (project: Project): void => {
  const el = document.getElementById(generateItemId(project.id));
  if (el) {
    setTimeout(() => {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 0);
  }
};
