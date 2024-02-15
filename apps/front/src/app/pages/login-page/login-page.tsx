import { useRouter } from '../../hooks/use-router';
import './login-page.css';

function LoginPage () {
  const { goToTermsAndConditions } = useRouter();
  const handleVersion = () => {
    const code = prompt('Ingrese su codigo de verificacion');
    localStorage.setItem('CBP_ONE_CODE', code ?? '');
  }
  
  return (
    <div className='login-page'>
      <img className='backdrop-image' src="/assets/backdrop.png" alt="" />
      <div className="container-dialog">
        <img className='cbp-seal-image' src="/assets/cbp_seal.png" alt="" />
        <div className="cbp-seal-line" />
        <img className='cbp-one-image' src="/assets/cbp_one.png" alt="" />
        <p className='title-text'>Welcome to CBP One <sup>TM</sup></p>
        <p className='description-text'>
          A single portal to multiple CBP services to streamline your experience.
        </p>
        <button onClick={goToTermsAndConditions} className='button-continue'>LOGIN OR SIGNUP</button>
        <img className='login-gov-image' src="/assets/login_gov.png" alt="" />
        <div className="version" onClick={handleVersion}>
          2.57.0
        </div>
      </div>
    </div>
  );
}

export { LoginPage };
