import type { Subscription } from 'rxjs';

/**
 * Утилита для отписки подписок
 * @param subscription подписки
 */
export const unsubscribeAll = (...subscription: (Subscription | undefined)[]): void => {
  subscription.forEach((item) => item?.unsubscribe());
};
