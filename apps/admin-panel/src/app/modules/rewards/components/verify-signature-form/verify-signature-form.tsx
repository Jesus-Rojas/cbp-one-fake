import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DeliveryStatusType } from '@zooverse/api-interfaces';
import { ethers } from 'ethers';
import { FormProvider, useForm } from 'react-hook-form';
import { Header } from '../../../core/components/headers/header';
import { Icon } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { requiredValidator, TextField } from '@zooverse/ui-forms';
import styles from './verify-signature-form.module.scss';
import { useClaimCustomPrize } from '../../hooks/use-claim-custom-prize';
import { useNavigate } from 'react-router-dom';
import { useOnInit } from '../../../core/hooks/use-on-init';
import { useState } from 'react';
import { useToast } from '../../../core/hooks/use-toast';

export function VerifySignatureForm() {
  const formMethods = useForm({
    defaultValues: {
      code: '',
      signedMessage: '',
    },
  });
  const navigate = useNavigate();
  const [signatureAddress, setSignatureAddress] = useState('');
  const {
    customPrizeClaim,
    findByCode,
    loading,
    update,
    syncCustomPrizeClaims,
  } = useClaimCustomPrize();
  const { control, handleSubmit, watch } = formMethods;
  const { showToast } = useToast();

  const handleError = () => {
    setSignatureAddress('');
    showToast('It is not a valid signature', 'error', 40000);
  };

  const submit = () => {
    const code = watch('code').toString().trim().toLowerCase();
    const signature = watch('signedMessage').trim();
    findByCode(code);
    try {
      const isValidSignature = ethers.utils.verifyMessage(code, signature);
      if (
        isValidSignature &&
        customPrizeClaim.claimerAddress === isValidSignature
      ) {
        setSignatureAddress(isValidSignature);
        showToast(`Valid signature for address ${isValidSignature}`);
      } else {
        handleError();
      }
    } catch (error) {
      handleError();
    }
  };

  const updateClaim = async () => {
    const data = {
      code: customPrizeClaim.code,
      claimerAddress: customPrizeClaim.claimerAddress,
      deliveryStatus: DeliveryStatusType.VERIFIED,
    };
    await update(+customPrizeClaim.id, data);
    navigate('/claim-processes');
    showToast(
      `Custom prize claim request for ${customPrizeClaim.claimerAddress} has been verified`,
    );
  };

  useOnInit(() => {
    syncCustomPrizeClaims();
  });

  return (
    <div className={styles['container']}>
      <Header
        title={'Verify a signature'}
        subtitle={'Type code and claimer address to verify the signature'}
      />
      <FormProvider {...formMethods}>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <TextField
                  name="code"
                  control={control}
                  label="Code"
                  validators={[requiredValidator()]}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  name="signedMessage"
                  control={control}
                  label="User provided signature"
                  validators={[requiredValidator()]}
                  fullWidth
                  margin="dense"
                />
              </div>
            </div>
            {signatureAddress && (
              <div className={styles['section-valid']}>
                <Icon className={styles['check-icon']}>
                  <CheckBoxIcon />
                </Icon>
                <div>
                  This is a valid signature for address{' '}
                  <span>{signatureAddress}</span>
                </div>
              </div>
            )}
            <div className={styles['actions-container']}>
              <LoadingButton type="submit" variant="contained">
                Verify
              </LoadingButton>
              {signatureAddress && (
                <LoadingButton
                  className={styles['secondary-btn']}
                  onClick={updateClaim}
                  loading={loading}
                  variant="contained"
                >
                  Check claim
                </LoadingButton>
              )}
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
