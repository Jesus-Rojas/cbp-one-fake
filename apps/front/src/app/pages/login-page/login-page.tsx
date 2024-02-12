import { HomeLayout } from '../../layouts/home-layout/home-layout';
import './login-page.css';

function LoginPage () {
  return (
    <HomeLayout>
      <p className='title-text'>Welcome to CBP One <sup>TM</sup></p>
      <p className='description-text'>
        A single portal to multiple CBP services to streamline your experience.
      </p>
      <button className='button-continue'>Continue</button>
    </HomeLayout>
  );
}

export { LoginPage };
