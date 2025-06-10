import type { NavigationItem } from '../types';

export const ROUTES: Record<string, NavigationItem> = {
  home: {
    displayName: 'home',
    path: '/',
    hidden: true,
  },
  dashboard: { displayName: 'dashboard', path: '/dashboard' },
  // add more routes here
};
