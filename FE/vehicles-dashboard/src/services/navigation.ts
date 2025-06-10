import { DUMMY_WAIT, ROUTES } from '../constants';
import type { NavigationItem } from '../types';

/**
 *
 * @returns dynamically fetched navigation if there is an API endpoint for it.
 */
export const fetchNavigation = async () => {
  return new Promise<NavigationItem[]>((resolve, reject) => {
    setTimeout(() => {
      if (Object.keys(ROUTES).length) {
        resolve(Object.values(ROUTES));
      }

      return reject();
    }, DUMMY_WAIT);
  });
};
