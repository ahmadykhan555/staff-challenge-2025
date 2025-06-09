import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Card, Headline, Button } from '@freenow/wave';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

type HomeProps = {};
const HomePage: React.FC<HomeProps> = () => {
  useDocumentTitle('Now!');

  const navigate = useNavigate();

  return (
    <section className="md:h-1/2 flex">
      <Card className="flex flex-col m-auto items-center space-y-4">
        <Headline size={'xl'}>
          Welcome to <span className="text-red-600 uppercase font-normal">FreeNow</span> Dashboard
        </Headline>
        <Button
          variant="secondary"
          className="px-4 py-2"
          onClick={() => navigate(ROUTES.dashboard)}
        >
          Lets explore
        </Button>
      </Card>
    </section>
  );
};
export default HomePage;
