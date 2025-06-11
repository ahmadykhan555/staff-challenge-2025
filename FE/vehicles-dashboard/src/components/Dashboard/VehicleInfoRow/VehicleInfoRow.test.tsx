import { render, screen, fireEvent } from '@testing-library/react';
import VehicleInfoRow from './VehicleInfoRow';
import { vi } from 'vitest';
import { getFuelString } from '../../../utils';
import { MOCK_VEHICLE } from '../../../constants';

vi.mock('../Base/AppBadge', () => ({
  default: (props: any) => <div data-testid="app-badge">{props.text}</div>,
}));

vi.mock('../Base/VehicleIcon', () => ({
  default: (props: any) => <div data-testid="vehicle-icon">{props.type}</div>,
}));

vi.mock('./VehicleCondition', () => ({
  default: (props: any) => (
    <div data-testid="vehicle-condition">
      condition: {props.condition}, fuel: {getFuelString(props.fuel)}
    </div>
  ),
}));

describe('VehicleInfoRow', () => {
  it('renders vehicle properties correctly', () => {
    const onRowClicked = vi.fn();
    const activeRowId = 'HHZ 23 H8522';
    render(
      <table>
        <tbody>
          <VehicleInfoRow
            vehicle={MOCK_VEHICLE}
            activeRowId={activeRowId}
            onRowClicked={onRowClicked}
          />
        </tbody>
      </table>
    );
    expect(screen.getByTestId('vehicle-icon')).toHaveTextContent(MOCK_VEHICLE.type);
    expect(screen.getByTestId('app-badge')).toHaveTextContent(MOCK_VEHICLE.state.toLowerCase());
    expect(screen.getByTestId('vehicle-condition')).toHaveTextContent(
      `condition: ${MOCK_VEHICLE.conditionAndFuel.condition}, fuel: ${getFuelString(MOCK_VEHICLE.conditionAndFuel.fuel)}`
    );
    expect(screen.getByText(MOCK_VEHICLE.coordinates.displayValue)).toBeInTheDocument();
    expect(screen.queryByText('RANDOM-LICENSE-KEY')).not.toBeInTheDocument();
    expect(screen.queryByText(activeRowId)).toBeInTheDocument();
  });

  it('calls onRowClicked with license plate onClick', () => {
    const onRowClicked = vi.fn();
    const activeRowId = 'HHZ 23 H8522';

    render(
      <table>
        <tbody>
          <VehicleInfoRow
            vehicle={MOCK_VEHICLE}
            activeRowId={activeRowId}
            onRowClicked={onRowClicked}
          />
        </tbody>
      </table>
    );

    const row = screen.getByRole('row');
    fireEvent.click(row);

    expect(onRowClicked).toHaveBeenCalledWith(MOCK_VEHICLE.licensePlate);
  });

  it('applies active row styling if activeRowId matches vehicle licensePlate', () => {
    const onRowClicked = vi.fn();
    const activeRowId = 'HHZ 23 H8522';

    const { container } = render(
      <table>
        <tbody>
          <VehicleInfoRow
            vehicle={MOCK_VEHICLE}
            activeRowId={activeRowId}
            onRowClicked={onRowClicked}
          />
        </tbody>
      </table>
    );

    const row = container.querySelector('tr');
    expect(row).toHaveClass('border-red-300');
    expect(row).toHaveClass('!bg-red-100');
  });
});
