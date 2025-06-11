import { Button } from '@freenow/wave';
import { useNavigate } from 'react-router-dom';

type Props = { text: string; to?: string; classes?: string; onClick?: () => void };
const AppButton: React.FC<Props> = ({ text, to, classes = '', onClick }) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => (onClick ? onClick() : to && navigate(to))}
      className={`px-4 py-2 ${classes}`}
      variant="secondary"
    >
      {text}
    </Button>
  );
};
export default AppButton;
