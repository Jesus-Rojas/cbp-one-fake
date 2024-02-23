import { requiredValidator, TextField } from '@cbp-one-fake/ui-forms';
import { LoadingButton } from '@mui/lab';

import styles from './login-form.module.scss';
import { FormProvider } from 'react-hook-form';
import { useLoginForm } from '../../hooks/use-login-form';

export function LoginForm() {
  const { control, formMethods, handleSubmit, loading, submit } = useLoginForm();

  return (
    <>
      <img
        className={styles['logo']}
        src="/assets/images/login.jpg"
      />
      <div className={styles['container']}>
        <FormProvider {...formMethods}>
          <div className={styles['form-container']}>
            <form onSubmit={handleSubmit(submit)}>
              <div className={styles['section-container']}>
                <div className={styles['section-content']}>
                  <TextField
                    name="username"
                    control={control}
                    label="Username"
                    validators={[requiredValidator()]}
                    disabled={false}
                    fullWidth
                    margin="dense"
                  />

                  <TextField
                    name="password"
                    type="password"
                    control={control}
                    label="Password"
                    validators={[requiredValidator()]}
                    disabled={false}
                    fullWidth
                    margin="dense"
                  />

                </div>
              </div>

              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
              >
                Login
              </LoadingButton>
            </form>
          </div>
        </FormProvider>
      </div>
    </>
  );
}
