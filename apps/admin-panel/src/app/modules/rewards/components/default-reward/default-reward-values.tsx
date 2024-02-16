import { AxiosError, HttpStatusCode } from 'axios';
import { Collapse, Alert } from '@mui/material';
import { DefaultFragmentsRewardDTO } from '@zooverse/api-interfaces';
import { FormProvider, useForm } from 'react-hook-form';
import { Header } from '../../../core/components/headers/header';
import { LoadingButton } from '@mui/lab';
import { requiredValidator, TextField } from '@zooverse/ui-forms';
import styles from './default-reward-values.module.scss';
import { useAccessToken } from '../../../access-control/hooks/use-access-token';
import { useHttpClient } from '@invorious/http-client-front';
import { useNavigate } from 'react-router-dom';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { useState } from 'react';
import { useToast } from '../../../core/hooks/use-toast';

export function DefaultRewardValues() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();
  const { control, handleSubmit, getValues, setValue } = formMethods;
  const [error, setError] = useState<string>('');
  const { showToast } = useToast();
  const { accessToken } = useAccessToken();
  const { get, put } = useHttpClient({
    config: {
      baseURL: '/api/config',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    onError({ response }: AxiosError) {
      if (response?.status === HttpStatusCode.Unauthorized) {
        navigate('/');
      }
    },
  });

  const getDefaultValues = async () => {
    setLoading(true);
    const response = await get<DefaultFragmentsRewardDTO>('rewards/default');
    setLoading(false);
    if (response) {
      setValue('min', response.min);
      setValue('max', response.max);
    }
  };

  const update = async () => {
    setError('');
    const { min, max } = getValues();

    if (isNaN(+min) || isNaN(+max)) {
      throw new Error('Min and max values must be a valid numbers');
    }

    const data = {
      min: Number(min),
      max: Number(max),
    };
    await put<DefaultFragmentsRewardDTO>('rewards/default', data);
    showToast('Default fragments values were updated');
  };

  useOnInit(() => {
    getDefaultValues();
  });

  return (
    <div className={styles['container']}>
      <Header
        title={'Default fragments values'}
        subtitle="Update default fragments values"
      />

      <FormProvider {...formMethods}>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit(update)}>
            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <TextField
                  name="min"
                  control={control}
                  label="Min"
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '^[0-9]+',
                  }}
                  validators={[
                    requiredValidator(
                      'This field must be an integer number greater than 0',
                    ),
                  ]}
                  fullWidth
                  margin="dense"
                />

                <TextField
                  name="max"
                  control={control}
                  label="Max"
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '^[0-9]+',
                  }}
                  validators={[
                    requiredValidator(
                      'This field must be an integer number greater than 0',
                    ),
                  ]}
                  fullWidth
                />
              </div>
            </div>

            <Collapse in={!!error}>
              <div className={styles['section-container']}>
                <Alert
                  className={styles['error-msg']}
                  variant="outlined"
                  severity="error"
                >
                  <span>{error}</span>
                </Alert>
              </div>
            </Collapse>

            <br />

            <LoadingButton type="submit" variant="contained" loading={loading}>
              <span>Update</span>
            </LoadingButton>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
