import React from 'react';
import type { CarType } from '../../types';

import FreeNowCarIcon from './../../assets/icons/map/free-now-car.svg';
import ShareNowCarIcon from './../../assets/icons/map/share-now-car.svg';

const VehicleIcon: React.FC<{
  type: CarType;
}> = ({ type }) => {
  return (
    <img className="size-10 mx-auto" src={type === 'free now' ? FreeNowCarIcon : ShareNowCarIcon} />
  );
};

export default VehicleIcon;
