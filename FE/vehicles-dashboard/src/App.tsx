import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ROUTES } from './constants';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path={ROUTES.home.path} caseSensitive index element={<Home />} />
          <Route path={ROUTES.dashboard.path} index element={<Dashboard />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
