import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import Logo from '../assets/icons/logo.svg';

const AppHeader = () => {
  return (
    <header className="flex border-b shadow-sm items-center">
      <Link to={ROUTES.home.path} className="px-4 ">
        <img src={Logo} />
      </Link>
      {Object.values(ROUTES).map(
        ({ displayName, path, hidden }) =>
          !hidden && (
            <Link
              key={displayName}
              className="border-r md:px-8 px-4 py-3 uppercase font-semibold last-of-type:border-0"
              to={path}
            >
              {displayName}
            </Link>
          )
      )}
    </header>
  );
};

export default AppHeader;
