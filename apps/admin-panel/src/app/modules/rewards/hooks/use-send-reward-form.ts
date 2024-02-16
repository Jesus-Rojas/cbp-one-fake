import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RewardType } from '@zooverse/api-interfaces';
import { useSendRewardFormApi } from './use-send-reward-form-api';
import { SendRewardForm } from '../types/send-reward-form.interface';
import { useToast } from '../../core/hooks/use-toast';
import { useCustomPrizes } from './use-custom-prizes';
import { useOnInit } from '../../core/hooks/use-on-init';
import { useTokenAttributes } from '../../shared/hooks/use-token-attributes';

export function useSendRewardForm() {
  const formMethods = useForm<SendRewardForm>({
    defaultValues: {
      customPrize: undefined,
      tokenAttribute: undefined,
      address: '',
      amount: 1,
      rewardType: RewardType.Fragment,
    },
  });
  const { tokenAttributes, syncTokenAttributes } = useTokenAttributes();
  const { customPrizes, syncCustomPrizes } = useCustomPrizes();
  const { control, handleSubmit, getValues, reset, watch } = formMethods;
  const rewardTypes = useMemo(() => Object.values(RewardType), []);
  const rewardType = watch('rewardType');
  const [loading, setLoading] = useState(false);
  const { createSendReward } = useSendRewardFormApi();
  const { showToast } = useToast();

  async function submit() {
    setLoading(true);
    const { address, amount, tokenAttribute, customPrize } = getValues();
    const reward = {
      amount: +amount,
      address,
      rewardType,
      customPrizeId: customPrize ? customPrize.id : 0,
      tokenAttributeId: tokenAttribute ? tokenAttribute.id : 0,
    };

    try {
      await createSendReward(reward);
      showToast(`It was send the reward to the address ${address}`);
      reset();
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  useOnInit(() => {
    syncTokenAttributes();
    syncCustomPrizes();
  });

  return {
    formMethods,
    handleSubmit,
    submit,
    rewardTypes,
    control,
    loading,
    tokenAttributes,
    customPrizes,
    rewardType,
  };
}
