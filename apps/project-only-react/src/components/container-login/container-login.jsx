import React from 'react';
import BackdropImage from '../../assets/backdrop.png';
import LoginGovImage from '../../assets/login_gov.png';
import CbpOneImage from '../../assets/cbp_one.png';
import CbpSealImage from '../../assets/cbp_seal.png';
import './container-login.css';

function ContainerLogin (props) {
  const { children } = props;
  return (
    <div>
      <img className='backdrop-image' src={BackdropImage} alt="" />
      <div className="container-dialog">
        <img className='cbp-seal-image' src={CbpSealImage} alt="" />
        <div className="cbp-seal-line" />
        <img className='cbp-one-image' src={CbpOneImage} alt="" />
        {children}
        <img className='login-gov-image' src={LoginGovImage} alt="" />
        <div className="version">
          2.57.0
        </div>
      </div>
    </div>
  );
}

export { ContainerLogin };
