import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Card, Headline, Button } from '@freenow/wave';

type HomeProps = {};
const HomePage: React.FC<HomeProps> = () => {
  useDocumentTitle('Now!');
  return (
    <section>
      <Card>
        <Headline size={'xl'}>Welcome to Free Now Dashboard</Headline>
        <Button variant={'primary'}>Lets explore</Button>
      </Card>
    </section>
  );
};
export default HomePage;
