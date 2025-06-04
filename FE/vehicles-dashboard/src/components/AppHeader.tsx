import { useEffect, useState } from 'react';
import type { NavigationItem } from '../types';
import { fetchNavigation } from '../api';

const AppHeader = () => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);

  useEffect(() => {
    fetchNavigation();
  }, []);

  return (
    <header>
      <p>navigationItems: {navigationItems.length}</p>
    </header>
  );
};

export default AppHeader;
