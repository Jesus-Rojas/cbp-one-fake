import { useState } from 'react';
import { sleep } from '../../helpers/sleep';
import { useLoading } from '../../hooks/use-loading';
import { useRouter } from '../../hooks/use-router';
import styles from './secure-login-page.module.scss';
import cn from 'classnames'


enum FieldForm {
  Email = 'email',
  Password = 'password',
  ShowPassword = 'showPassword',
}

function SecureLoginPage () {
  const { goToTermsAndConditions } = useRouter();
  const { open, close } = useLoading();
  const [isVerifySite, setIsVerifySite] = useState(false);
  const [form, setForm] = useState({
    [FieldForm.Email]: '',
    [FieldForm.Password]: '',
    [FieldForm.ShowPassword]: false,
  });

  const updateField = (fieldForm: FieldForm, value: unknown) => {
    setForm((prevState) => ({
      ...prevState,
      [fieldForm]: value,
    }));
  };

  
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

      <div className={styles['container-page']}>
        <div className={styles['container-sign-up-login']}>
          <div className={styles['login']}>
            Iniciar sesión
          </div>
          <div className={styles['sign-up']}>
            Crear cuenta
          </div>
        </div>

        <h2 className={styles['title-heading']}>
          Iniciar sesión para usuarios existentes
        </h2>

        <div className={styles['form-login']}>
          <p className={styles['field-text']}>
            Dirección de correo electrónico
          </p>

          <input
            type="email"
            className={styles['field']}
            onChange={(e) => updateField(FieldForm.Email, e.target.value)}
            value={form[FieldForm.Email]}
          />

          <p className={styles['field-text']}>
            Contraseña
          </p>

          <input 
            type={!form[FieldForm.ShowPassword] ? 'password' : 'text'}
            className={styles['field']} 
            onChange={(e) => updateField(FieldForm.Password, e.target.value)}
            value={form[FieldForm.Password]}
          />

          <div className={styles['see-password']}>
            <input
              type="checkbox"
              checked={form[FieldForm.ShowPassword]}
              readOnly
            />
            <span
              onClick={() => updateField(FieldForm.ShowPassword, !form[FieldForm.ShowPassword])}
            >
              Mostrar contraseña
            </span>
          </div>

          <button className={styles['login-submit']}>
            Iniciar sesión
          </button>
        </div>

        <div className={styles['page-footer']}>
          <a
            href="https://secure.login.gov/es/users/password/new"
          >
            ¿Olvidó su contraseña?
          </a>

          <a 
            target="_blank" 
            className={styles['external-site']}
            href="https://www.login.gov/es/policy/"
          >
            Prácticas de seguridad y privacidad
            
            <span />
          </a>

          <a 
            target="_blank" 
            className={styles['external-site']}
            href="https://www.login.gov/es/policy/our-privacy-act-statement/"
          >
            Declaración de la ley de privacidad
            
            <span />
          </a>
        </div>
      </div>

      <div className={styles['footer']}>
        <button className={styles['language']}>
          <img 
            width="12" 
            height="12" 
            alt="" 
            src="https://secure.login.gov/assets/globe-blue-a313543c.svg"
          />

          <span>Idioma</span>

          <img 
            width="12" 
            height="12" 
            alt="" 
            src="https://secure.login.gov/assets/angle-arrow-up-ffbd5fa4.svg"
          />
        </button>

        <div className={styles['footer-links']}>
          <a
            target="_blank"
            className={cn(styles['external-site'], styles['img-link-footer'])}
            href="https://www.gsa.gov"
          >
            <img
              alt="Administración General de Servicios de EE. UU."
              src="https://secure.login.gov/assets/sp-logos/square-gsa-dark-09497aa7.svg"
              width="20"
              height="20"
            />
            <span></span>
          </a>
          
          <a
            target="_blank"
            className={styles['external-site']}
            href="https://www.login.gov/es/help/"
          >
            Ayuda
            <span></span>
          </a>
          
          <a
            target="_blank"
            className={styles['external-site']}
            href="https://www.login.gov/es/contact/"
          >
            Contactar
            <span></span>
          </a>
          <a
            target="_blank"
            className={styles['external-site']}
            href="https://www.login.gov/es/policy/"
          >
            Privacidad y seguridad
            <span></span>
          </a>
        </div>
      </div>
    </>
  );
}

export { SecureLoginPage };
