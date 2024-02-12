import React from 'react';
import { ContainerLogin } from '../container-login/container-login';
import './unauthorized.css';

function Unauthorized () {
  return (
    <ContainerLogin>
      <p className='title-text'>
        User unauthorized,
        <br />
        verify link.
      </p>
    </ContainerLogin>
  );
}

export { Unauthorized };
