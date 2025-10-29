import '@src/Popup.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Result from './pages/Results';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { ErrorDisplay, LoadingSpinner } from '@extension/ui';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const Popup = () => (
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="questions" element={<Questions />} />
        <Route path="result" element={<Result />} />
      </Route>
    </Routes>
  </MemoryRouter>
);

export default withErrorBoundary(withSuspense(Popup, <LoadingSpinner />), ErrorDisplay);
