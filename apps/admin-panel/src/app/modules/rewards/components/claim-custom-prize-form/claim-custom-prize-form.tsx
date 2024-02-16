import {
  ClaimCustomPrizeResponseType,
  DeliveryStatusType,
} from '@zooverse/api-interfaces';
import { FormMode } from '../../../core/types/form-mode.enum';
import { FormProvider, useForm } from 'react-hook-form';
import { Header } from '../../../core/components/headers/header';
import { LoadingButton } from '@mui/lab';
import { requiredValidator, SelectField, TextField } from '@zooverse/ui-forms';
import styles from './claim-custom-prize-form.module.scss';
import { useClaimCustomPrize } from '../../hooks/use-claim-custom-prize';
import { useCustomPrizesWinners } from '../../hooks/use-custom-prizes-winners';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOnInit } from '../../../core/hooks/use-on-init';
import { useToast } from '../../../core/hooks/use-toast';

export interface ClaimCustomPrizeProps {
  mode: FormMode;
}

export function ClaimCustomPrizeForm(props: ClaimCustomPrizeProps) {
  const { mode } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    create,
    customPrizeClaim,
    deliver,
    findById,
    generateCode,
    loading,
    update,
  } = useClaimCustomPrize();
  const { completeBalances } = useCustomPrizesWinners();
  const formMethods = useForm();
  const { control, handleSubmit, getValues, setValue } = formMethods;
  const { showToast } = useToast();
  const deliveryStatusTypes = useMemo(
    () => Object.values(DeliveryStatusType),
    [],
  );

  const currentMode = () => {
    if (mode === FormMode.Create) return 'Create a custom prize claim';
    if (mode === FormMode.Edit) return 'Update custom prize claim';
    return 'View of custom prize claim';
  };

  const createClaim = async () => {
    const {
      code,
      signedMessage,
      customPrizeId,
      claimerAddress,
      deliveryStatus,
    } = getValues();
    if (claimerAddress) {
      const data = {
        code,
        signedMessage,
        customPrizeId: +customPrizeId.trim(),
        claimerAddress: claimerAddress.trim(),
        deliveryStatus,
      };
      await create(data);
      showToast(
        `New custom prize claim for address ${claimerAddress} was created`,
      );
    }
    return;
  };

  const updateDelivery = async () => {
    const { code, customPrizeId, claimerAddress, deliveryStatus } = getValues();
    const data = {
      code: code.toString().trim().toLocaleLowerCase(),
      customPrizeId,
      claimerAddress: claimerAddress.trim(),
      deliveryStatus,
    };
    const customPrizeToDeliver = completeBalances.find(
      (completeBalance) =>
        completeBalance.customPrize.id === customPrizeId.trim() &&
        completeBalance.user?.address === claimerAddress.trim(),
    );

    if (customPrizeToDeliver) {
      const deliverData = {
        userId: +customPrizeToDeliver.user!.id,
        customPrizeId: +customPrizeToDeliver.customPrize.id,
        amount: +customPrizeToDeliver.amount,
        code: code.toString().trim().toLowerCase(),
      };
      const delivered =
        (await deliver(deliverData)) ||
        ClaimCustomPrizeResponseType.NotDelivered;

      if (delivered === ClaimCustomPrizeResponseType.Delivered && id) {
        const updated =
          (await update(+id, data)) || ClaimCustomPrizeResponseType.NotUpdated;
        return showToast(updated);
      }

      return showToast(delivered);
    }
    return showToast('The custom prize to deliver could not be found');
  };

  const updateClaim = async () => {
    const { code, customPrizeId, claimerAddress, deliveryStatus } = getValues();
    const data = {
      code: code.toString().trim().toLocaleLowerCase(),
      customPrizeId,
      claimerAddress: claimerAddress.trim(),
      deliveryStatus,
    };

    if (id) {
      const updated =
        (await update(+id, data)) || ClaimCustomPrizeResponseType.NotUpdated;
      showToast(updated);
    }
  };

  const submit = async () => {
    const { deliveryStatus } = getValues();

    if (mode === FormMode.Create) {
      await createClaim();
    }

    if (
      mode === FormMode.Edit &&
      deliveryStatus !== DeliveryStatusType.DELIVERED
    ) {
      await updateClaim();
    }

    if (
      mode === FormMode.Edit &&
      deliveryStatus === DeliveryStatusType.DELIVERED
    ) {
      await updateDelivery();
    }

    navigate('/claim-processes');
  };

  useOnInit(() => {
    if (id && !isNaN(+id) && mode !== FormMode.Create) {
      findById(+id);
    }
  });

  useEffect(() => {
    if (mode === FormMode.Create) {
      setValue('code', generateCode());
      setValue('signedMessage', 'Code not signed by the user');
      setValue('deliveryStatus', DeliveryStatusType.OPEN);
    } else {
      setValue('code', customPrizeClaim.code);
      setValue('signedMessage', customPrizeClaim.signedMessage);
      setValue('customPrizeId', customPrizeClaim.customPrizeId);
      setValue('claimerAddress', customPrizeClaim.claimerAddress);
      setValue('deliveryStatus', customPrizeClaim.deliveryStatus);
      setValue('claimDate', customPrizeClaim.claimDate);
    }
  }, [customPrizeClaim, generateCode, mode, setValue]);

  return (
    <div className={styles['container']}>
      <Header title={'Custom prize claim'} subtitle={currentMode()} />
      <FormProvider {...formMethods}>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <TextField
                  name="code"
                  control={control}
                  label="Generated code"
                  validators={[requiredValidator()]}
                  disabled={mode !== FormMode.Edit}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  name="customPrizeId"
                  control={control}
                  label="Custom Prize ID"
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  name="claimerAddress"
                  control={control}
                  label="Claimer address"
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  margin="dense"
                />
                {mode === FormMode.Edit ? (
                  <SelectField
                    className={styles['select']}
                    name="deliveryStatus"
                    label="Delivery status"
                    control={control}
                    options={deliveryStatusTypes}
                    validators={[requiredValidator()]}
                    getOptionLabel={(deliveryStatusType) => deliveryStatusType}
                    isOptionEqualToValue={(optionA, optionB) =>
                      optionA === optionB
                    }
                  />
                ) : (
                  <TextField
                    name="deliveryStatus"
                    label="Delivery status"
                    control={control}
                    disabled
                    fullWidth
                    margin="dense"
                  />
                )}
                {mode !== FormMode.Create && (
                  <>
                    <TextField
                      name="signedMessage"
                      control={control}
                      label="Code signature"
                      validators={[requiredValidator()]}
                      disabled
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      name="claimDate"
                      control={control}
                      label="Last update"
                      validators={[requiredValidator()]}
                      disabled
                      fullWidth
                      margin="dense"
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
