import {
  requiredValidator,
  TextField,
  emailValidator,
} from '@cbp-one-fake/ui-forms';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from 'react-hook-form';

import styles from './user-form.module.scss';
import { useUserForm } from '../hooks/use-user-form';
import { Header } from '../../core/components/headers/header';
import { FormMode } from '../../core/types/form-mode.enum';

export interface UserFormProps {
  mode: FormMode;
}

export function UserForm(props: UserFormProps) {
  const {
    formMethods,
    handleSubmit,
    submit,
    control,
    mode,
    loading,
    currentMode,
  } = useUserForm(props);

  return (
    <div className={styles['container']}>
      <Header title={'Appointments'} subtitle={currentMode()} />
      <FormProvider {...formMethods}>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <TextField
                  name="username"
                  control={control}
                  label="Email"
                  validators={[requiredValidator(), emailValidator()]}
                  disabled={false}
                  fullWidth
                  type="email"
                />
                
                <TextField
                  name="password"
                  control={control}
                  label="Password"
                  validators={[requiredValidator()]}
                  disabled={false}
                  fullWidth
                  margin="dense"
                />
              </div>
            </div>

            {mode !== FormMode.View && (
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
              >
                {mode === FormMode.Create && <span>Create</span>}
                {mode === FormMode.Edit && <span>Update</span>}
              </LoadingButton>
            )}
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
