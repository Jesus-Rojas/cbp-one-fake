import { FormProvider } from 'react-hook-form';
import {
  requiredValidator,
  TextField,
  FileUpload,
  emailValidator,
} from '@zooverse/ui-forms';
import { Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import styles from './partner-form.module.scss';
import { FormMode } from '../../core/types/form-mode.enum';
import { Header } from '../../core/components/headers/header';
import { usePartnerForm } from '../hooks/use-partner-form';

export interface PartnerFormProps {
  mode: FormMode;
}

export function PartnerForm(props: PartnerFormProps) {
  const {
    formMethods,
    handleSubmit,
    submit,
    control,
    mode,
    partner,
    loading,
    currentMode,
  } = usePartnerForm(props);

  return (
    <div className={styles['container']}>
      <Header title={'Partners'} subtitle={currentMode()} />
      <FormProvider {...formMethods}>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <TextField
                  name="name"
                  control={control}
                  label="Name"
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  margin="dense"
                />

                <TextField
                  name="description"
                  control={control}
                  label="Description"
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  multiline
                  rows="4"
                />

                <TextField
                  name="email"
                  control={control}
                  label="Email"
                  validators={[requiredValidator(), emailValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  type="email"
                />

                <TextField
                  name="discord"
                  control={control}
                  label="Discord"
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  margin="dense"
                />

                <TextField
                  name="opensea"
                  control={control}
                  label="Opensea"
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  margin="dense"
                />

                <TextField
                  name="twitter"
                  control={control}
                  label="Twitter"
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  margin="dense"
                />

                {mode !== FormMode.View && (
                  <>
                    <div className={styles['sub-title']}>Image</div>
                    <FileUpload
                      name="image"
                      control={control}
                      types={['PNG', 'JPG', 'JPEG']}
                      validators={
                        mode === FormMode.Create
                          ? [requiredValidator()]
                          : undefined
                      }
                    />
                  </>
                )}

                {mode !== FormMode.Create && partner?.imageUrl && (
                  <>
                    <div className={styles['sub-title']}>Image Saved</div>
                    <Avatar
                      alt={`${partner.name} profile picture`}
                      src={partner.imageUrl}
                    />
                  </>
                )}
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
