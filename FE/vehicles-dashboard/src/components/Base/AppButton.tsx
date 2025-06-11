import { Button } from '@freenow/wave';
import { useNavigate } from 'react-router-dom';

type Props = { text: string; to?: string };
const AppButton: React.FC<Props> = ({ text, to }) => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => to && navigate(to)} className="px-4 py-2" variant="secondary">
      {text}
    </Button>
  );
};
export default AppButton;
