import { Navigate, createHashRouter } from "react-router-dom";
import { App } from "../app";
import { HomePage } from "../pages/home-page/home-page";
import { LoginPage } from "../pages/login-page/login-page";
import { TermsAndConditionsPage } from "../pages/terms-and-conditions-page/terms-and-conditions-page";
import { TicketPage } from "../pages/ticket-page/ticket-page";


export const hashRouter = createHashRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'terms-and-conditions',
        element: <TermsAndConditionsPage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'ticket',
        element: <TicketPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);