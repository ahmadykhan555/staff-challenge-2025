import { Skeleton } from '@freenow/wave';

const DashboardLoadingState = () => (
  <>
    <Skeleton animated className="border !bg-slate-50 !w-full md:!h-1/3" />
    <Skeleton animated className="border !bg-slate-50 w-full flex-1" />
  </>
);

export default DashboardLoadingState;
