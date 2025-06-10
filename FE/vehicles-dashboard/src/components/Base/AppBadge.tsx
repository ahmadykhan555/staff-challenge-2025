import React from 'react';

type BadgeTypes = 'success' | 'danger' | 'warning';
type BadgeProps = {
  type: BadgeTypes;
  text: string;
};
const AppBadge: React.FC<BadgeProps> = ({ type, text }) => {
  const classesForBadge: Record<BadgeTypes, string> = {
    success: 'border-green-600 text-green-600',
    danger: 'border-free-now-red text-free-now-red',
    warning: 'border-orange-600 text-orange-600',
  };

  return (
    <div className={`text-xs border capitalize rounded px-2 py-1 ${classesForBadge[type]}`}>
      {text}
    </div>
  );
};

export default AppBadge;
