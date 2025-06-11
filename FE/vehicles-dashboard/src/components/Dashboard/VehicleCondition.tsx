import React from 'react';
import type { VehicleCondition } from '../../types';
import { getFuelString } from '../../utils';
import AppIcon from '../Base/AppIcon';

type Props = {
  condition: VehicleCondition;
  fuel: number;
};

const VehicleConditionLabel: React.FC<Props> = ({ condition, fuel }) => {
  return (
    <div className="flex items-center justify-center ">
      {condition !== '-' ? (
        <AppIcon classes="mr-4" name={condition === 'BAD' ? 'sadFace' : 'happyFace'} size="md" />
      ) : (
        condition
      )}
      <span>{getFuelString(fuel)}</span>
    </div>
  );
};

export default VehicleConditionLabel;
