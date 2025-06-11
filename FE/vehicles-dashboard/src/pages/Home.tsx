import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Card, Headline } from '@freenow/wave';
import { ROUTES } from '../constants';
import AppButton from '../components/Base/AppButton';

const HomePage: React.FC = () => {
  useDocumentTitle('Now!');

  return (
    <section className="md:h-1/2 flex">
      <Card className="flex flex-col m-auto items-center space-y-4">
        <Headline size={'xl'}>
          Welcome to <span className="text-free-now-red uppercase font-normal">FreeNow</span> Panel
        </Headline>
        <AppButton text="Lets explore" to={ROUTES.dashboard.path} />
      </Card>
    </section>
  );
};
export default HomePage;
