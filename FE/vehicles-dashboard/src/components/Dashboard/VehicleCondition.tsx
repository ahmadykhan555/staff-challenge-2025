import React from 'react';
import type { VehicleCondition } from '../../types';

import HappyIcon from '../../assets/icons/happy.svg';
import SadIcon from '../../assets/icons/sad.svg';
import { getFuelString } from '../../utils';

type Props = {
  condition: VehicleCondition;
  fuel: number;
};

const VehicleConditionLabel: React.FC<Props> = ({ condition, fuel }) => {
  return (
    <div className="flex items-center justify-center ">
      {condition !== '-' ? (
        <img className="size-4 mr-4" src={condition === 'BAD' ? SadIcon : HappyIcon} />
      ) : (
        condition
      )}
      <span>{getFuelString(fuel)}</span>
    </div>
  );
};

export default VehicleConditionLabel;
