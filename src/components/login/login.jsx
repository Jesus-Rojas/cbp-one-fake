import React from 'react';
import { ContainerLogin } from '../container-login/container-login';
import './login.css';

function Login () {
  return (
    <ContainerLogin>
      <p className='title-text'>Welcome to CBP One <sup>TM</sup></p>
      <p className='description-text'>
        A single portal to multiple CBP services to streamline your experience.
      </p>
      <button className='button-continue'>Continue</button>
    </ContainerLogin>
  );
}

export { Login };
