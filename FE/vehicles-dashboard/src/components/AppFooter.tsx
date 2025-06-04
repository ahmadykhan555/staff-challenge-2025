import React from 'react';

const Footer: React.FC<any> = () => {
  return (
    <footer className="flex justify-between px-8 py-4 items-center">
      <h4 className="text-sm">© {2025} All rights reserved</h4>
      <ul className="flex space-x-4 font-light items-center">
        <li>About</li>
        <li>Legal</li>
        <li>Admin Panel</li>
      </ul>
    </footer>
  );
};

export default Footer;
