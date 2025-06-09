import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type HomeProps = {};
const HomePage: React.FC<HomeProps> = () => {
  useDocumentTitle('Now!');
  return <div className="app-wrapper">Home Page</div>;
};
export default HomePage;
