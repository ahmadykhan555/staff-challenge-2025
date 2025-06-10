import { Button, Card, Headline } from '@freenow/wave';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default () => {
  useDocumentTitle('ERROR PAGE');
  const navigate = useNavigate();

  return (
    <div className="w-full h-1/2  flex">
      <Card className="m-auto items-center flex flex-col space-y-4  ">
        <Headline size={'xxl'}>404 - Not Found</Headline>
        <Button
          variant="secondary"
          className="py-2 px-4 !bg-white"
          onClick={() => navigate(ROUTES.home.path)}
        >
          Home
        </Button>
      </Card>
    </div>
  );
};
