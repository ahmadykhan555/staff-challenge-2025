import React from 'react';

const AppBadge: React.FC<{
  type: 'success' | 'danger' | 'warning';
  text: string;
}> = ({ type, text }) => {
  return (
    <div
      className={`text-xs border capitalize rounded px-2 py-1 ${type === 'success' ? 'border-green-600 text-green-600' : type === 'danger' ? 'border-orange-600 text-orange-600' : ''}`}
    >
      {text}
    </div>
  );
};

export default AppBadge;
