import React from 'react';
import AppHeader from '../components/AppHeader';

import { Outlet } from 'react-router-dom';

const DefaultLayout: React.FC<{}> = () => {
  return (
    <div>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default DefaultLayout;
