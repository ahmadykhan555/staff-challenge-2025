import { Link } from 'react-router-dom';

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
    <header className="flex border-b shadow-sm">
      {items.map((item) => (
        <Link className="border-r md:px-8 px-4 py-3 uppercase font-semibold" to={item.to}>
          {item.displayName}
        </Link>
      ))}
    </header>
  );
};

export default AppHeader;
