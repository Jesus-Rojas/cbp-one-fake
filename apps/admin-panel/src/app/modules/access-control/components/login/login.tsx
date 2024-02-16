import { environment } from '../../../../../environments/environment';
import styles from './login.module.scss';
import { useAccessToken } from '../../hooks/use-access-token';
import { useMetamaskStrategy } from '@invorious/access-control-front';
import { useNavigate } from 'react-router-dom';
import { JwtPayload, RoleType } from '@zooverse/api-interfaces';
import { useToast } from '../../../core/hooks/use-toast';
import { Button } from '@mui/material';

export function Login() {
  const navigate = useNavigate();
  const { setAccessToken } = useAccessToken();
  const { showToast } = useToast();
  const { login, requestError } = useMetamaskStrategy({
    baseURL: 'api/auth/metamask',
  });

  const isAdmin = (accessToken: string) => {
    const [, payloadEncoded] = accessToken.split('.');
    const payload: JwtPayload = JSON.parse(atob(payloadEncoded));
    return payload.role === RoleType.Admin;
  };

  const handleMetamaskLogin = async () => {
    const response = await login(environment.loginMessage);
    if (!requestError) {
      const { accessToken } = response;
      if (!isAdmin(accessToken)) {
        showToast("User isn't admin", 'error');
        return;
      }
      setAccessToken(accessToken);
      navigate('/panel');
    }
  };

  return (
    <div className={styles['container']}>
      <img
        className={styles['logo']}
        src="assets/shared/logo.png"
        alt="ZooVerse Logo"
      />
      <Button variant="contained" onClick={handleMetamaskLogin}>
        Connect
      </Button>
    </div>
  );
}
