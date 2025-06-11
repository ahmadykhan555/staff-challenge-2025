import React from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

import { Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <main className="flex-1 md:p-8">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default DefaultLayout;
