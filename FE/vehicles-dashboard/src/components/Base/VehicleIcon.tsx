import React from 'react';
import type { VehicleType } from '../../types';
import AppIcon from './AppIcon';

const VehicleIcon: React.FC<{
  type: VehicleType;
}> = ({ type }) => {
  return (
    <>
      <AppIcon
        classes="mx-auto"
        name={type === 'free now' ? 'freeNowCarIcon' : 'shareNowCarIcon'}
        size="lg"
      />
      <p className="text-2xs -mt-2">{type}</p>
    </>
  );
};

export default VehicleIcon;
