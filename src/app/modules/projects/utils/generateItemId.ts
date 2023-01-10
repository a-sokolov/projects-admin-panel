import { PROJECT_ITEM_PREFIX_ID } from '../constants';

/**
 * Функция для генерации идентификатора карточки проекта
 * @param id идентификатор записи
 */
export const generateItemId = (id: string): string => {
  return `${PROJECT_ITEM_PREFIX_ID}${id}`;
};
