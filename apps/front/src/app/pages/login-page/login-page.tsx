import { sleep } from '../../helpers/sleep';
import { useLoading } from '../../hooks/use-loading';
import { useRouter } from '../../hooks/use-router';
import styles from './login-page.module.scss';

function LoginPage () {
  const { goToTermsAndConditions } = useRouter();
  const { open, close } = useLoading();
  
  const handleLogin = async () => {
    open();
    await sleep();
    close();
    goToTermsAndConditions();
  }
  
  return (
    <>
      <div className={styles['header']}>
        <img src="/assets/images/flag-us.png" alt="" />
        <p>Official App of the U.S. Departament of Homeland Security</p>
      </div>
      <img className={styles['backdrop-image']} src="/assets/images/backdrop.png" alt="" />
      <div className={styles['container-dialog']}>
        <img className={styles['cbp-seal-image']} src="/assets/images/cbp_seal.png" alt="" />
        <div className={styles['cbp-seal-line']} />
        <img className={styles['cbp-one-image']} src="/assets/images/cbp_one.png" alt="" />
        <p className={styles['title-text']}>Welcome to CBP One <sup>TM</sup></p>
        <p className={styles['description-text']}>
          A single portal to multiple CBP services to streamline your experience.
        </p>
        <button
          onClick={handleLogin}
          className={styles['button-continue']}
        >
          LOGIN OR SIGNUP
        </button>
        <img className={styles['login-gov-image']} src="/assets/images/login_gov.png" alt="" />
        <div className={styles['version']}>
          2.57.0
        </div>
      </div>
    </>
  );
}

export { LoginPage };
