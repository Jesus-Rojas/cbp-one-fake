import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import { Icon } from '@mui/material';
import { IconButton } from '@mui/material';
import { SideBar } from '../side-bar/side-bar';
import styles from './main-layout.module.scss';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAccessToken } from '../../../access-control/hooks/use-access-token';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  const navigate = useNavigate();
  const { setAccessToken } = useAccessToken();

  const handleLoout = async () => {
    setAccessToken('');
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
            <img
              className={styles['logo']}
              src="assets/shared/logo.png"
              alt="ZooVerse Logo"
            />
            <Typography
              className={styles['typography']}
              variant="h6"
              noWrap
              component="div"
            >
              Zooverse | Admin Panel
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
