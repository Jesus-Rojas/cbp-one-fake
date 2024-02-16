import { useRouter } from '../../hooks/use-router';
import styles from './login-page.module.scss';

function LoginPage () {
  const { goToTermsAndConditions } = useRouter();
  const handleVersion = () => {
    const code = prompt('Ingrese su codigo de verificacion');
    localStorage.setItem('CBP_ONE_CODE', code ?? '');
  }
  
  return (
    <>
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
          onClick={goToTermsAndConditions}
          className={styles['button-continue']}
        >
          LOGIN OR SIGNUP
        </button>
        <img className={styles['login-gov-image']} src="/assets/images/login_gov.png" alt="" />
        <div className={styles['version']} onClick={handleVersion}>
          2.57.0
        </div>
      </div>
    </>
  );
}

export { LoginPage };
