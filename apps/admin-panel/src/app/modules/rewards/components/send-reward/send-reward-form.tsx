import { FormProvider } from 'react-hook-form';
import {
  requiredValidator,
  TextField,
  SelectField,
  metamaskAddressValidator,
  minValueValidator,
} from '@zooverse/ui-forms';
import { RewardType } from '@zooverse/api-interfaces';
import { LoadingButton } from '@mui/lab';
import styles from './send-reward-form.module.scss';
import { Header } from '../../../core/components/headers/header';
import { useSendRewardForm } from '../../hooks/use-send-reward-form';

export function SendRewardForm() {
  const {
    formMethods,
    handleSubmit,
    submit,
    rewardTypes,
    control,
    loading,
    tokenAttributes,
    customPrizes,
    rewardType,
  } = useSendRewardForm();

  return (
    <div className={styles['container']}>
      <Header title={'Send Rewards'} subtitle="" />

      <FormProvider {...formMethods}>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <SelectField
                  label="Reward Type"
                  name="rewardType"
                  control={control}
                  options={rewardTypes}
                  validators={[requiredValidator()]}
                  getOptionLabel={(rewardTypeValue) => rewardTypeValue}
                  isOptionEqualToValue={(optionA, optionB) =>
                    optionA === optionB
                  }
                />

                <TextField
                  name="address"
                  control={control}
                  label="Address"
                  validators={[requiredValidator(), metamaskAddressValidator()]}
                  fullWidth
                  margin="dense"
                />

                <TextField
                  name="amount"
                  control={control}
                  label="Amount"
                  validators={[requiredValidator(), minValueValidator()]}
                  fullWidth
                  margin="dense"
                  type="number"
                />

                {rewardType === RewardType.TokenAttribute && (
                  <SelectField
                    name="tokenAttribute"
                    label="Token Attribute"
                    control={control}
                    options={tokenAttributes}
                    validators={[requiredValidator()]}
                    getOptionLabel={(tokenAttribute) =>
                      [
                        tokenAttribute.type,
                        tokenAttribute.value,
                        tokenAttribute.rarity,
                      ].join(' | ')
                    }
                    isOptionEqualToValue={(optionA, optionB) =>
                      optionA.id === optionB.id
                    }
                  />
                )}

                {rewardType === RewardType.CustomPrize && (
                  <SelectField
                    name="customPrize"
                    label="Custom Prize"
                    control={control}
                    options={customPrizes}
                    validators={[requiredValidator()]}
                    getOptionLabel={(customPrize) => customPrize.name}
                    isOptionEqualToValue={(optionA, optionB) =>
                      optionA.id === optionB.id
                    }
                  />
                )}
              </div>
            </div>

            <LoadingButton type="submit" variant="contained" loading={loading}>
              Send
            </LoadingButton>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
