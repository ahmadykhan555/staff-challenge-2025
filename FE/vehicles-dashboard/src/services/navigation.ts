import { DUMMY_WAIT, ROUTES } from '../constants';
import type { NavigationItem } from '../types';

export const fetchNavigation = async () => {
  return new Promise<NavigationItem[]>((resolve, reject) => {
    setTimeout(() => {
      if (Object.keys(ROUTES).length) {
        console.log('responding');
        return resolve([
          {
            displayName: 'Home',
            path: ROUTES.home,
          },
        ]);
      }

      return reject();
    }, DUMMY_WAIT);
  });
};
