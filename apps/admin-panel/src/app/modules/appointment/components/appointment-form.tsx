import {
  requiredValidator,
  TextField,
  emailValidator,
  DatePickerField,
  DateTimePickerField,
} from '@cbp-one-fake/ui-forms';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import cn from 'classnames';
import { FormProvider } from 'react-hook-form';

import styles from './appointment-form.module.scss';
import { useAppointmentForm } from '../hooks/use-appointment-form';
import { Header } from '../../core/components/headers/header';
import { FormMode } from '../../core/types/form-mode.enum';
import { Icon } from '../../core/components/icon/icon';


export interface AppointmentFormProps {
  mode: FormMode;
}

export function AppointmentForm(props: AppointmentFormProps) {
  const {
    formMethods,
    handleSubmit,
    submit,
    control,
    mode,
    loading,
    currentMode,
    travelersForm,
    addTraveler,
    removeTraveler,
  } = useAppointmentForm(props);

  return (
    <div className={styles['container']}>
      <Header title={'Appointments'} subtitle={currentMode()} />
      <FormProvider {...formMethods}>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <TextField
                  name="place"
                  control={control}
                  label="Place"
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  margin="dense"
                />

                <TextField
                  name="code"
                  control={control}
                  label="Code"
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  margin="dense"
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

                <DateTimePickerField
                  name="dateTime"
                  label="Date Time"
                  control={control}
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                />
              </div>
            </div>

            <div className={styles['section-container']}>
              <div className={styles['section-title-travelers']}>
                <h3>Travelers</h3>
                <div>
                <Button
                  variant="contained"
                  onClick={addTraveler}
                >
                  Add Traveler
                </Button>
                </div>

              </div>

              <div className={styles['section-content']}>
              {(travelersForm || []).map((__, travelerFormIndex) => (
                  <div
                    key={`travelers-${travelerFormIndex}`}
                    className={styles['traveler-row']}
                  >
                    <TextField
                      name={`travelers.${travelerFormIndex}.name`}
                      control={control}
                      label="Name"
                      validators={[requiredValidator()]}
                      disabled={mode === FormMode.View}
                      fullWidth
                    />

                    <DatePickerField
                      name={`travelers.${travelerFormIndex}.birthday`}
                      control={control}
                      label="Birthday"
                      validators={[requiredValidator()]}
                      disabled={mode === FormMode.View}
                    />

                    <TextField
                      name={`travelers.${travelerFormIndex}.numberOfConfirmation`}
                      control={control}
                      label="Number Of Confirmation"
                      validators={[requiredValidator()]}
                      disabled={mode === FormMode.View}
                      fullWidth
                    />

                    <Icon
                      className={cn(styles['icon-close'], {
                        [styles['icon-close-hidden']]: mode === FormMode.View,
                      })}
                      onClick={() => removeTraveler(travelerFormIndex)}
                    >close</Icon>
                  </div>
                ))}
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
