import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { RewardConfigForm } from '../types/reward-config-form.type';
import { useCallback, useEffect, useState } from 'react';
import {
  CreateRewardConfigDTO,
  CreateRewardConfigTableDTO,
  CustomPrizeDTO,
  CustomPrizeRewardConfigDTO,
  FragmentRewardConfigDTO,
  RewardConfigDTO,
  RewardConfigTableDTO,
  RewardType,
  TokenAttributeDTO,
  TokenAttributeRewardConfigDTO,
  UpdateRewardConfigTableDTO,
} from '@zooverse/api-interfaces';
import { useRewardTable } from './use-reward-table';
import { useToast } from '../../core/hooks/use-toast';
import { useNavigate } from 'react-router';
import { TypeRewardConfig } from '../types/type-reward-config.enum';
import { AxiosError } from 'axios';

export function useRewardConfigForm() {
  const {
    rewardConfig,
    createRewardConfig,
    updateRewardConfig,
    setRewardConfig,
    syncRewardConfigTables,
  } = useRewardTable();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const formMethods = useForm<RewardConfigForm>({
    defaultValues: {
      startAt: dayjs(),
      finishAt: dayjs(),
      customPrizeId: 0,
      tokenAttributeId: 0,
      fragmentRewards: [],
      tokenAttributeRewards: [],
      customPrizeRewards: [],
    },
  });
  const { control, handleSubmit, getValues, setValue, watch } = formMethods;
  const [error, setError] = useState<Record<TypeRewardConfig, string>>({
    [TypeRewardConfig.Coins]: '',
    [TypeRewardConfig.CustomPrizes]: '',
    [TypeRewardConfig.TokenAttributes]: '',
    [TypeRewardConfig.Default]: '',
    [TypeRewardConfig.General]: '',
  });
  const [probability, setProbability] = useState<
    Record<
      | TypeRewardConfig.Coins
      | TypeRewardConfig.CustomPrizes
      | TypeRewardConfig.TokenAttributes,
      number
    >
  >({
    [TypeRewardConfig.Coins]: 0,
    [TypeRewardConfig.CustomPrizes]: 0,
    [TypeRewardConfig.TokenAttributes]: 0,
  });
  const [customPrizeRewards, setCustomPrizeRewards] = useState<
    CustomPrizeRewardConfigDTO[]
  >([]);
  const [tokenAttributeRewards, setTokenAttributeRewards] = useState<
    TokenAttributeRewardConfigDTO[]
  >([]);
  const [fragmentRewards, setFragmentRewards] = useState<
    FragmentRewardConfigDTO[]
  >([]);

  const fragmentRewardsForm = watch('fragmentRewards');
  const customPrizeRewardsForm = watch('customPrizeRewards');
  const tokenAttributeRewardsForm = watch('tokenAttributeRewards');
  const defaultProbability = watch('defaultRewardConfig.probability');

  function setErrorRewardConfig(
    errorRewardConfig: TypeRewardConfig,
    message: string,
  ) {
    setError((prevState) => ({ ...prevState, [errorRewardConfig]: message }));
  }

  async function create() {
    const { name, startAt, finishAt, defaultRewardConfig } = getValues();

    const rewards: RewardConfigDTO[] = [
      ...fragmentRewards,
      ...tokenAttributeRewards,
      ...customPrizeRewards,
    ];
    const rewardsToCreate: CreateRewardConfigDTO[] = rewards.map((reward) => {
      const { rewardType } = reward;
      if (rewardType === RewardType.CustomPrize) {
        return { ...reward, customPrizeId: reward.customPrize.id };
      }
      if (rewardType === RewardType.TokenAttribute) {
        return { ...reward, tokenAttributeId: reward.tokenAttribute.id };
      }

      return reward;
    });
    const totalProbability = getAutosumProbability([
      ...rewardsToCreate.map(
        (rewardToCreate) => rewardToCreate.probability || 0,
      ),
      +defaultRewardConfig.probability,
    ]);

    if (finishAt < startAt) {
      return setErrorRewardConfig(
        TypeRewardConfig.Default,
        'End date must be greater than start date',
      );
    }

    setErrorRewardConfig(TypeRewardConfig.Default, '');

    if (totalProbability !== 100) {
      return setErrorRewardConfig(
        TypeRewardConfig.General,
        'Total sum of probabilities must be equal to 100%',
      );
    }

    setErrorRewardConfig(TypeRewardConfig.General, '');

    const data: CreateRewardConfigTableDTO = {
      name,
      startAt: startAt.toISOString(),
      finishAt: finishAt.toISOString(),
      defaultRewardConfig: {
        ...defaultRewardConfig,
        min: +defaultRewardConfig.min,
        max: +defaultRewardConfig.max,
        probability: +defaultRewardConfig.probability,
        rewardType: RewardType.Fragment,
      },
      rewards: rewardsToCreate,
    };
    try {
      await createRewardConfig(data);
      showToast(`New table: ${name} was created`);
      navigate('/reward-configs');
      syncRewardConfigTables();
    } catch (e: unknown) {
      const response = (e as AxiosError).response;
      if (response?.status === 400) {
        showToast(
          `Error: ${(response as { data: { message: string } }).data.message}`,
          'error',
        );
        return;
      }
    }
  }

  const validateUpdate = (
    rewardType: RewardType.CustomPrize | RewardType.TokenAttribute,
  ) => {
    const rewardsForm: Array<{
      customPrize?: CustomPrizeDTO;
      tokenAttribute?: TokenAttributeDTO;
    }> =
      rewardType === RewardType.CustomPrize
        ? customPrizeRewardsForm
        : tokenAttributeRewardsForm;
    const someIsNotFilled = rewardsForm.some((rewardForm) =>
      rewardType === RewardType.CustomPrize
        ? !rewardForm.customPrize
        : !rewardForm.tokenAttribute,
    );

    if (someIsNotFilled) {
      setErrorRewardConfig(
        TypeRewardConfig.General,
        rewardType === RewardType.CustomPrize
          ? 'Some Custom Prize is not filled'
          : 'Some Token Attribute is not filled',
      );
      return;
    }

    const amountRewards = rewardsForm.reduce(
      (accumulatorReward, rewardForm) => {
        const { customPrize, tokenAttribute } = rewardForm;
        let id = 0;
        if (customPrize) id = customPrize.id;
        if (tokenAttribute) id = tokenAttribute.id;

        if (accumulatorReward[id]) {
          accumulatorReward[id]++;
          return accumulatorReward;
        }
        accumulatorReward[id] = 1;
        return accumulatorReward;
      },
      {} as Record<number, number>,
    );

    const rewardId = Object.keys(amountRewards)
      .map(parseInt)
      .find((rewardId) => amountRewards[rewardId] > 1);

    if (rewardId === undefined) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const reward = rewardsForm.find((rewardForm) => {
      const { customPrize, tokenAttribute } = rewardForm;
      let id = 0;
      if (customPrize) id = customPrize.id;
      if (tokenAttribute) id = tokenAttribute.id;
      return id === rewardId;
    })!;

    const { tokenAttribute, customPrize } = reward;

    if (customPrize) {
      setErrorRewardConfig(
        TypeRewardConfig.General,
        `Custom Prize ${customPrize.name} is duplicated, please verify !!!`,
      );
    }
    if (tokenAttribute) {
      setErrorRewardConfig(
        TypeRewardConfig.General,
        `Token Attribute ${tokenAttribute.type} ${tokenAttribute.value} is duplicated, please verify !!!`,
      );
    }
    return;
  };

  async function update() {
    const {
      name,
      startAt,
      finishAt,
      defaultRewardConfig,
      fragmentRewards: fragmentRewardsForm,
      tokenAttributeRewards: tokenAttributeRewardsForm,
      customPrizeRewards: customPrizeRewardsForm,
    } = getValues();

    if (!validateUpdate(RewardType.CustomPrize)) return;
    if (!validateUpdate(RewardType.TokenAttribute)) return;

    const rewards = [
      ...fragmentRewardsForm,
      ...tokenAttributeRewardsForm,
      ...customPrizeRewardsForm,
    ];

    const totalProbability = getAutosumProbability([
      ...rewards.map((rewardToCreate) => +rewardToCreate.probability || 0),
      +defaultRewardConfig.probability,
    ]);

    if (totalProbability !== 100) {
      setErrorRewardConfig(
        TypeRewardConfig.General,
        `Total sum of probabilities must be equal to 100%, actually ${totalProbability}`,
      );
      return;
    }
    if (finishAt < startAt) {
      setErrorRewardConfig(
        TypeRewardConfig.General,
        'End date must be greater than start date',
      );
      return;
    }

    setErrorRewardConfig(TypeRewardConfig.General, '');
    const body: UpdateRewardConfigTableDTO = {
      id: rewardConfig.id,
      name,
      startAt: startAt.toISOString(),
      finishAt: finishAt.toISOString(),
      defaultRewardConfig,
      rewards,
    };
    await updateRewardConfig(rewardConfig.id, body);
    showToast(`Table: ${name} updated`);
    navigate('/reward-configs');
    syncRewardConfigTables();
  }

  function submitReward(rewardType: RewardType) {
    const { fragmentRewards, tokenAttributeRewards, customPrizeRewards } =
      getValues();
    function isValid(
      min: number,
      max: number,
      limit: number,
      errorRewardConfig: TypeRewardConfig,
    ) {
      if (min === undefined || !max || limit === undefined) {
        setErrorRewardConfig(
          errorRewardConfig,
          'Min, max and limit must be defined',
        );
        return false;
      }
      if (+min <= 0) {
        setErrorRewardConfig(
          errorRewardConfig,
          'Min value must be greater than 0',
        );
        return false;
      }
      if (+min > +max) {
        setErrorRewardConfig(
          errorRewardConfig,
          'Max value must be greater than min',
        );
        return false;
      }
      if (+limit <= 0) {
        setErrorRewardConfig(
          errorRewardConfig,
          'Limit value must be greater than 0',
        );
        return false;
      }

      return true;
    }

    if (rewardType === RewardType.Fragment) {
      const { fragmentRewardConfig } = getValues();
      const { min, max, probability, limit } = fragmentRewardConfig;
      if (!isValid(min, max, limit, TypeRewardConfig.Coins)) {
        return;
      }
      const rewards = [
        ...fragmentRewards,
        {
          id: 0,
          min: +min,
          max: +max,
          probability: +probability,
          limit: +limit,
          rewardType,
          delivered: 0,
        },
      ];
      setValue('fragmentRewardConfig', {
        limit: 0,
        max: 0,
        min: 0,
        probability: 0,
      });
      setValue('fragmentRewards', rewards);
      setFragmentRewards(rewards);
      setErrorRewardConfig(TypeRewardConfig.Coins, '');
      return;
    }

    if (rewardType === RewardType.TokenAttribute) {
      const { tokenAttributeRewardConfig, tokenAttribute } = getValues();
      const { min, max, probability, limit } = tokenAttributeRewardConfig;

      if (!tokenAttribute) {
        setErrorRewardConfig(
          TypeRewardConfig.TokenAttributes,
          'Token Attribute must be picked',
        );
        return;
      }

      if (!isValid(min, max, limit, TypeRewardConfig.TokenAttributes)) {
        return;
      }

      const existTokenAttributeInRewardsConfig = tokenAttributeRewards
        .filter(
          (tokenAttributeReward) =>
            tokenAttributeReward.rewardType === RewardType.TokenAttribute,
        )
        .some(
          (tokenAttributeReward) =>
            tokenAttributeReward.tokenAttribute.id === tokenAttribute.id,
        );

      if (existTokenAttributeInRewardsConfig) {
        setErrorRewardConfig(
          TypeRewardConfig.TokenAttributes,
          'Token Attribute already exists',
        );
        return;
      }

      const rewards = [
        ...tokenAttributeRewards,
        {
          id: 0,
          min: +min,
          max: +max,
          probability: +probability,
          limit: +limit,
          rewardType,
          delivered: 0,
          tokenAttribute,
        },
      ];
      setValue('tokenAttributeRewardConfig', {
        limit: 0,
        max: 0,
        min: 0,
        probability: 0,
      });
      setValue('tokenAttributeRewards', rewards);
      setValue('tokenAttribute', undefined);
      setTokenAttributeRewards(rewards);
      setErrorRewardConfig(TypeRewardConfig.TokenAttributes, '');
      return;
    }

    if (rewardType === RewardType.CustomPrize) {
      const { customPrizeRewardConfig, customPrize } = getValues();
      const { min, max, probability, limit } = customPrizeRewardConfig;
      if (!customPrize) {
        setErrorRewardConfig(
          TypeRewardConfig.CustomPrizes,
          'Custom prize must be picked',
        );
        return;
      }
      if (!isValid(min, max, limit, TypeRewardConfig.CustomPrizes)) {
        return;
      }
      const existCustomPrizeInRewardsConfig = customPrizeRewards
        .filter(
          (customPrizeReward) =>
            customPrizeReward.rewardType === RewardType.CustomPrize,
        )
        .some(
          (customPrizeReward) =>
            customPrizeReward.customPrize.id === customPrize.id,
        );

      if (existCustomPrizeInRewardsConfig) {
        setErrorRewardConfig(
          TypeRewardConfig.CustomPrizes,
          'Custom Prize already exists',
        );
        return;
      }
      const rewards: CustomPrizeRewardConfigDTO[] = [
        ...customPrizeRewards,
        {
          id: 0,
          min: +min,
          max: +max,
          probability: +probability,
          limit: +limit,
          rewardType,
          delivered: 0,
          customPrize,
        },
      ];
      setValue('customPrizeRewardConfig', {
        limit: 0,
        max: 0,
        min: 0,
        probability: 0,
      });
      setValue('customPrizeRewards', rewards);
      setValue('customPrize', undefined);
      setCustomPrizeRewards(rewards);
      setErrorRewardConfig(TypeRewardConfig.CustomPrizes, '');
    }
  }

  const setValues = useCallback(
    (rewardConfig: RewardConfigTableDTO) => {
      const {
        name,
        startAt,
        finishAt,
        defaultRewardConfig,
        fragmentRewardConfigs,
        tokenAttributeRewardConfigs,
        customPrizeRewardConfigs,
      } = rewardConfig;

      setValue('name', name);
      setValue('startAt', dayjs(startAt));
      setValue('finishAt', dayjs(finishAt));
      setValue('defaultRewardConfig', defaultRewardConfig);
      setValue('fragmentRewards', fragmentRewardConfigs);
      setFragmentRewards(fragmentRewardConfigs);
      setValue('tokenAttributeRewards', tokenAttributeRewardConfigs);
      setTokenAttributeRewards(tokenAttributeRewardConfigs);
      setValue('customPrizeRewards', customPrizeRewardConfigs);
      setCustomPrizeRewards(customPrizeRewardConfigs);
    },
    [setValue],
  );

  function removeFragmentConfig(index: number) {
    const updatedRewards = fragmentRewards.filter(
      (__, indexFragmentConfig) => indexFragmentConfig !== index,
    );
    setValue('fragmentRewards', updatedRewards);
    setFragmentRewards(updatedRewards);
    setRewardConfig((rewardConfig) => ({
      ...rewardConfig,
      fragmentRewardConfigs: updatedRewards,
    }));
  }

  function removeCustomPrizeConfig(index: number) {
    const updatedRewards = customPrizeRewards.filter(
      (__, indexFragmentConfig) => index !== indexFragmentConfig,
    );
    setValue('customPrizeRewards', updatedRewards);
    setCustomPrizeRewards(updatedRewards);
    setRewardConfig((rewardConfig) => ({
      ...rewardConfig,
      customPrizeRewardConfigs: updatedRewards,
    }));
  }

  function removeTokenAttributeConfig(index: number) {
    const updatedRewards = tokenAttributeRewards.filter(
      (__, indexFragmentConfig) => indexFragmentConfig !== index,
    );
    setValue('tokenAttributeRewards', updatedRewards);
    setTokenAttributeRewards(updatedRewards);
    setRewardConfig((rewardConfig) => ({
      ...rewardConfig,
      tokenAttributeRewardConfigs: updatedRewards,
    }));
  }

  function getAutosumProbability(probabilities: number[]) {
    return probabilities.reduce(
      (autoSum, probability) => autoSum + probability,
      0,
    );
  }

  useEffect(() => {
    const probabilities = customPrizeRewardsForm.map(
      (customPrizeRewardForm) => +customPrizeRewardForm.probability,
    );
    setProbability((prevState) => ({
      ...prevState,
      [TypeRewardConfig.CustomPrizes]: getAutosumProbability(probabilities),
    }));
  }, [customPrizeRewardsForm]);

  useEffect(() => {
    const probabilities = tokenAttributeRewardsForm.map(
      (tokenAttributeRewardForm) => +tokenAttributeRewardForm.probability,
    );
    setProbability((prevState) => ({
      ...prevState,
      [TypeRewardConfig.TokenAttributes]: getAutosumProbability(probabilities),
    }));
  }, [tokenAttributeRewardsForm]);

  useEffect(() => {
    const probabilities = fragmentRewardsForm.map(
      (fragmentRewardForm) => +fragmentRewardForm.probability,
    );
    setProbability((prevState) => ({
      ...prevState,
      [TypeRewardConfig.Coins]: getAutosumProbability(probabilities),
    }));
  }, [fragmentRewardsForm]);

  useEffect(() => {
    const probabilities = [...Object.values(probability), +defaultProbability];
    const sumProbability = getAutosumProbability(probabilities);
    if (sumProbability !== 100) {
      setError((prevState) => ({
        ...prevState,
        [TypeRewardConfig.General]: `Total sum of probabilities must be equal to 100%, current probability ${sumProbability}`,
      }));
      return;
    }
    setError((prevState) => ({
      ...prevState,
      [TypeRewardConfig.General]: '',
    }));
  }, [probability, defaultProbability]);

  return {
    update,
    create,
    control,
    handleSubmit,
    submitReward,
    setValues,
    error,
    formMethods,
    customPrizeRewards,
    tokenAttributeRewards,
    fragmentRewards,
    removeFragmentConfig,
    removeCustomPrizeConfig,
    removeTokenAttributeConfig,
    setCustomPrizeRewards,
    setTokenAttributeRewards,
    probability,
  };
}
