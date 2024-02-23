import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

import App from './app/app';
import { Toast } from './app/modules/core/components/toast/toast';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    primary: {
      main: '#6562ff',
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <HashRouter>
            <App />
            <Toast />
          </HashRouter>
        </LocalizationProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  </StrictMode>
);
