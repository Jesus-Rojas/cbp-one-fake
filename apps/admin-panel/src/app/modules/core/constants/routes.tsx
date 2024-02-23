import { LoginForm } from '../../access-control/components/login/login-form';
import { Navigate } from 'react-router-dom';
import { Route } from '../types/route';
import { AppointmentTable } from '../../appointment/components/appointment-table';
import { AppointmentForm } from '../../appointment/components/appointment-form';
import { FormMode } from '../types/form-mode.enum';

export const routes: Route[] = [
  { path: '/login', element: <LoginForm />, page: true },
  { path: '/panel', element: <div>Welcome!</div> },
  { path: '/appointments', element: <AppointmentTable /> },
  { path: '/appointments/create', element: <AppointmentForm mode={FormMode.Create} /> },
  { path: '/appointments/edit/:id', element: <AppointmentForm mode={FormMode.Edit} /> },
  { path: '/appointments/view/:id', element: <AppointmentForm mode={FormMode.View} /> },
  { path: '*', element: <Navigate to="/login" /> },
];
