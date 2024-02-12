import { ReactNode } from 'react';
import './home-layout.css';

function HomeLayout (props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div>
      <img className='backdrop-image' src="/assets/backdrop.png" alt="" />
      <div className="container-dialog">
        <img className='cbp-seal-image' src="/assets/cbp_seal.png" alt="" />
        <div className="cbp-seal-line" />
        <img className='cbp-one-image' src="/assets/cbp_one.png" alt="" />
        {children}
        <img className='login-gov-image' src="/assets/login_gov.png" alt="" />
        <div className="version">
          2.57.0
        </div>
      </div>
    </div>
  );
}

export { HomeLayout };
