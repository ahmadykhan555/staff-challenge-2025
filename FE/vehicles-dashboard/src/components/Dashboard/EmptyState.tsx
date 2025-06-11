import { Card, Headline } from '@freenow/wave';
import AppButton from '../Base/AppButton';
import { ROUTES } from '../../constants';

const DashboardEmptyState = () => (
  <>
    <Card className="text-center space-y-4">
      <Headline>Ooops....</Headline>
      <p>Looks like the server is offline or there is no data available at the moment</p>

      <AppButton to={ROUTES.home.path} text="Home" classes="mr-4" />
      <AppButton text="Refresh" onClick={() => window.location.reload()} />
    </Card>
  </>
);

export default DashboardEmptyState;
