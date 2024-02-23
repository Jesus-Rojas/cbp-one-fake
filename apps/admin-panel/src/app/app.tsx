import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MainLayout } from './modules/core/components/main-layout/main-layout';
import { routes } from './modules/core/constants/routes';
import { Route, Routes, useLocation } from 'react-router-dom';

export function App() {
  const location = useLocation();
  const pageRoutes = routes.filter((route) => route.page);
  const componentRoutes = routes.filter((route) => !route.page);

  if (pageRoutes.map((route) => route.path).includes(location.pathname)) {
    return (
      <Routes>
        {pageRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    );
  }

  return (
    <MainLayout>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          {componentRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </LocalizationProvider>
    </MainLayout>
  );
}
export default App;
