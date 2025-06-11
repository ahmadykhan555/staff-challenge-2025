import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer, {
  setSelectedVehicle,
  setVehiclesForCurrentPage,
} from '../../../store/vehiclesSlice';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import Dashboard from '../../../pages/Dashboard';
import { VEHICLES_PAGE_3 } from '../../../constants';
import useVehiclesData from '../../../hooks/useVehiclesData';

vi.mock('../../../hooks/useVehiclesData');
const mockUseVehiclesData = useVehiclesData as jest.MockedFunction<typeof useVehiclesData>;
const setupStoreWithVehicles = (vehicles: any[]) => {
  const store = configureStore({
    reducer: {
      vehiclesReducer,
    },
  });
  store.dispatch(setVehiclesForCurrentPage(vehicles));
  store.dispatch(setSelectedVehicle(vehicles[0]));
  return store;
};

describe('Dashboard page integration test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows vehicles, allows selecting from table and map, and handles pagination', async () => {
    mockUseVehiclesData.mockReturnValue({
      vehicles: VEHICLES_PAGE_3,
      isLoading: false,
    });
    const store = setupStoreWithVehicles(VEHICLES_PAGE_3); // local store slice for testing
    render(
      <Provider store={store}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );

    // 1. Table rows visible
    expect(await screen.findByText('HHZ 23 H8001')).toBeInTheDocument();
    expect(await screen.findByText('HHZ 23 H8002')).toBeInTheDocument();

    // 2. Selected row has red border
    const activeRow = screen.getByText('HHZ 23 H8001').closest('tr');
    expect(activeRow).toHaveClass('border-red-300');

    // 3. Click on row HHZ 23 H8002
    const row = screen.getByText('HHZ 23 H8002').closest('tr');
    fireEvent.click(row!);

    // 4. Ensure two nodes are found (1 for marker and 1 row)
    expect(screen.getAllByText('HHZ 23 H8002').length).toBe(2);

    // 5. Wait until selection updates
    await waitFor(() => {
      expect(screen.getByTestId('HHZ 23 H8002').closest('tr')).toHaveClass('border-red-300');
    });

    // 6. Ensure row 1 is not selected anymore
    expect(screen.getByTestId('HHZ 23 H8001').closest('tr')).not.toHaveClass('border-red-300');

    /**
     *
     * Can be extended further to test pagination & marker click
     *
     */
  });
});
