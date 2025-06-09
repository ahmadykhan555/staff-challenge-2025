import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import Logo from '../assets/icons/logo.svg';

const AppHeader = () => {
  const items = [
    {
      to: '/',
      displayName: 'home',
    },
    {
      to: '/dashboard',
      displayName: 'Dashboard',
    },
  ];
  return (
    <header className="flex border-b shadow-sm items-center">
      <Link to={ROUTES.home} className=" px-4 py-3">
        <img src={Logo} />
      </Link>
      {items.map((item) => (
        <Link
          key={item.to}
          className="border-r md:px-8 px-4 py-3 uppercase font-semibold"
          to={item.to}
        >
          {item.displayName}
        </Link>
      ))}
    </header>
  );
};

export default AppHeader;
