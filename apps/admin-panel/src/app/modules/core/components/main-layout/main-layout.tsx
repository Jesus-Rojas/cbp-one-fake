import {
  Typography,
  Toolbar,
  IconButton,
  Icon,
  Drawer,
  CssBaseline,
  Box,
  AppBar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import styles from './main-layout.module.scss';
import { useAccessToken } from '../../../access-control/hooks/use-access-token';
import { SideBar } from '../side-bar/side-bar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  const navigate = useNavigate();
  const { updateToken } = useAccessToken();

  const handleLoout = async () => {
    updateToken('');
    navigate('/login');
  };

  return (
    <Box id={styles['main-layout-container']}>
      <CssBaseline />
      <AppBar
        className={styles['app-bar']}
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar className={styles['toolbar']}>
          <div className={styles['toolbar-left']}>
            <Typography
              className={styles['typography']}
              variant="h6"
              noWrap
              component="div"
            >
              Cbp One Fake | Admin Panel
            </Typography>
          </div>
          <div className={styles['toolbar-right']}>
            <IconButton className={styles['logout']} onClick={handleLoout}>
              <Icon>logout</Icon>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer className={styles['drawer']} variant="permanent">
        <Toolbar />
        <Box className={styles['side-bar-box']}>
          <SideBar />
        </Box>
      </Drawer>
      <Box component="main" className={styles['main-content-box']}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
