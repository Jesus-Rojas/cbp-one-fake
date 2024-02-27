import { LoginForm } from '../../access-control/components/login/login-form';
import { Navigate } from 'react-router-dom';
import { Route } from '../types/route';
import { AppointmentTable } from '../../appointment/components/appointment-table';
import { AppointmentForm } from '../../appointment/components/appointment-form';
import { FormMode } from '../types/form-mode.enum';
import { UserTable } from '../../user/components/user-table';
import { UserForm } from '../../user/components/user-form';

export const routes: Route[] = [
  { path: '/login', element: <LoginForm />, page: true },
  { path: '/panel', element: <div>Welcome!</div> },
  { path: '/appointments', element: <AppointmentTable /> },
  { path: '/appointments/create', element: <AppointmentForm mode={FormMode.Create} /> },
  { path: '/appointments/edit/:id', element: <AppointmentForm mode={FormMode.Edit} /> },
  { path: '/appointments/view/:id', element: <AppointmentForm mode={FormMode.View} /> },
  { path: '/users', element: <UserTable /> },
  { path: '/users/create', element: <UserForm mode={FormMode.Create} /> },
  { path: '*', element: <Navigate to="/login" /> },
];
