import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { MainPage } from './components/MainPage';

export const App = () => (
  <Provider store={store}>
    <Routes>
      <Route index element={<MainPage />} />

      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/goods" element={<HomePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Provider>
);
