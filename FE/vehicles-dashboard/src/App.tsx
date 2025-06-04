import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ROUTES } from './constants';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path={ROUTES.home} index element={<Home />} />
          <Route path={ROUTES.dashboard} index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
