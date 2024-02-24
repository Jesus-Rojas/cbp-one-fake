import { useState } from 'react';
import { sleep } from '../../helpers/sleep';
import { useLoading } from '../../hooks/use-loading';
import { useRouter } from '../../hooks/use-router';
import styles from './secure-login-page.module.scss';
import cn from 'classnames'


function SecureLoginPage () {
  const { goToTermsAndConditions } = useRouter();
  const { open, close } = useLoading();
  const [isVerifySite, setIsVerifySite] = useState(false);
  
  return (
    <>
      <div className={styles['banner']}>
        <div className={styles['container-flag']}>
          <img
            src="https://secure.login.gov/assets/us_flag-9715e180.svg"
          />
        </div>

        <div className={styles['container-text']}>
          <p>
            Un sitio oficial del Gobierno de Estados Unidos
          </p>
          <p
            className={cn(
              styles['verify-text'],
              {
                [styles['d-none']]: isVerifySite,
              }
            )}
            onClick={() => setIsVerifySite(!isVerifySite)}
          >
            Así es como usted puede verificarlo
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
            </svg>
          </p>
        </div>

        <div
          className={cn(
            styles['container-close'],
            {
              [styles['d-none']]: !isVerifySite,
            }
          )}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            onClick={() => setIsVerifySite(!isVerifySite)}
          >
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </div>
        
      </div>
      
      <div
        className={cn(
          styles['content-banner'],
          {
            [styles['d-none']]: !isVerifySite
          }
        )}
      >
        <img 
          src="https://secure.login.gov/assets/icon-dot-gov-54a71b45.svg" 
        />
        <p>
          <strong>Los sitios web oficiales usan .gov</strong>
          <br /> Un sitio web <strong>.gov</strong> pertenece a una organización oficial del Gobierno de Estados Unidos.
        </p>

        <img 
          src="https://secure.login.gov/assets/icon-https-f29d4be7.svg"
        />

        <p>
          <strong>Los sitios web seguros .gov usan HTTPS</strong>
          <br /> Un <strong>candado</strong> (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 7.72 9.43"
              width={9}
              height={12}
            >
              <path 
                fill="#5b616a" 
                d="M7.72 8.79a.64.64 0 0 1-.64.64H.64A.64.64 0 0 1 0 8.79V4.93a.64.64 0 0 1 .64-.64h.22V3a3 3 0 0 1 6 0v1.29h.21a.64.64 0 0 1 .64.64zm-2.15-4.5V3a1.72 1.72 0 0 0-3.43 0v1.29z"
              />
            </svg>
          ) o <strong>https://</strong> significa que usted se conectó de forma segura a un sitio web .gov. Comparta información sensible sólo en sitios web oficiales y seguros.
        </p>
      </div>
      <div className={styles['header']}>
        <img
          src="https://secure.login.gov/assets/logo-a6f6c558.svg"
          className={styles['login-gov']}
          alt=""
        />
      </div>
    </>
  );
}

export { SecureLoginPage };
