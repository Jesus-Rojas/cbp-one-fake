import { FormProvider } from 'react-hook-form';
import {
  requiredValidator,
  TextField,
  metamaskAddressValidator,
} from '@zooverse/ui-forms';
import { LoadingButton } from '@mui/lab';
import styles from './reset-password-form.module.scss';
import { Header } from '../../core/components/headers/header';
import { useResetPasswordForm } from '../hooks/use-reset-password-form';

export function ResetPasswordForm() {
  const { formMethods, handleSubmit, submit, control, loading } =
    useResetPasswordForm();

  return (
    <div className={styles['container']}>
      <Header title="Reset password by address" subtitle="" />
      <FormProvider {...formMethods}>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <TextField
                  name="address"
                  control={control}
                  label="Address"
                  validators={[requiredValidator(), metamaskAddressValidator()]}
                  fullWidth
                  margin="dense"
                />
              </div>
            </div>

            <LoadingButton type="submit" variant="contained" loading={loading}>
              <span>Update</span>
            </LoadingButton>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
