import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FormMode } from '../../../core/types/form-mode.enum';
import styles from './reward-config-form.module.scss';
import { useRewardTable } from '../../hooks/use-reward-table';
import { useOnInit } from '../../../core/hooks/use-on-init';
import { Header } from '../../../core/components/headers/header';
import {
  DatePickerField,
  TextField,
  requiredValidator,
  SelectField,
} from '@zooverse/ui-forms';
import { LoadingButton } from '@mui/lab';
import { RewardType } from '@zooverse/api-interfaces';
import { Alert, Button, Collapse, Icon } from '@mui/material';
import { useCustomPrizes } from '../../hooks/use-custom-prizes';
import { useTokenAttributes } from '../../../shared/hooks/use-token-attributes';
import { RewardConfigurationContainer } from '../reward-container/reward-configuration-container';
import { useRewardConfigForm } from '../../hooks/use-reward-config-form';
import { TypeRewardConfig } from '../../types/type-reward-config.enum';

export interface RewardConfigFormProps {
  mode: FormMode;
}

export function RewardConfigForm(props: RewardConfigFormProps) {
  const { mode } = props;
  const { findById, rewardConfig, loading } = useRewardTable();
  const { customPrizes, syncCustomPrizes } = useCustomPrizes();
  const { tokenAttributes, syncTokenAttributes } = useTokenAttributes();
  const { id } = useParams();
  const {
    control,
    handleSubmit,
    create,
    error,
    setValues,
    submitReward,
    update,
    formMethods,
    fragmentRewards,
    tokenAttributeRewards,
    customPrizeRewards,
    removeFragmentConfig,
    removeCustomPrizeConfig,
    removeTokenAttributeConfig,
    probability,
  } = useRewardConfigForm();
  const rewardExists = Object.keys(rewardConfig).length > 0;
  const currentMode = () => {
    if (mode === FormMode.Create) return 'Create a reward configuration table';
    if (mode === FormMode.Edit) return 'Update reward configuration table';
    return 'View of reward configuration table';
  };
  const renderError = (value: string, className = '') => (
    <Collapse in={!!value}>
      <div className={className}>
        <Alert
          className={styles['error-msg']}
          variant="outlined"
          severity="error"
        >
          <span>{value}</span>
        </Alert>
      </div>
    </Collapse>
  );

  const renderAutoSumProbability = (value: number) => (
    <span>Autosum of probability: {value}</span>
  );

  async function submit() {
    if (mode === FormMode.Create) {
      await create();
    }

    if (mode === FormMode.Edit) {
      await update();
    }
  }

  useOnInit(() => {
    if (mode !== FormMode.View) {
      syncCustomPrizes();
      syncTokenAttributes();
    }
    if (id && mode !== FormMode.Create && !isNaN(+id)) {
      findById(+id);
    }
  });

  useEffect(() => {
    if (rewardExists && mode !== FormMode.Create) {
      setValues(rewardConfig);
    }
  }, [mode, rewardConfig, rewardExists, setValues]);

  return (
    <div className={styles['container']}>
      <Header title={'Reward Configuration'} subtitle={currentMode()} />

      <FormProvider {...formMethods}>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles['section-container']}>
              <div className={styles['base-config']}>
                <div className={styles['section-content']}>
                  <TextField
                    name="name"
                    control={control}
                    label="Name"
                    validators={[requiredValidator()]}
                    disabled={mode === FormMode.View}
                    margin="dense"
                  />
                  <DatePickerField
                    name="startAt"
                    label="start"
                    control={control}
                    validators={[requiredValidator()]}
                    disabled={mode === FormMode.View}
                  />
                  <DatePickerField
                    name="finishAt"
                    label="finish"
                    control={control}
                    validators={[requiredValidator()]}
                    disabled={mode === FormMode.View}
                  />
                </div>
                <div className={styles['section-content']}>
                  <div className={styles['sub-title']}>Default reward </div>
                  <TextField
                    name="defaultRewardConfig.min"
                    control={control}
                    type="number"
                    label="Min fragments amount"
                    validators={[requiredValidator()]}
                    disabled={mode === FormMode.View}
                  />
                  <TextField
                    name="defaultRewardConfig.max"
                    control={control}
                    type="number"
                    label="Max fragments amount"
                    validators={[requiredValidator()]}
                    disabled={mode === FormMode.View}
                  />
                  <TextField
                    name="defaultRewardConfig.probability"
                    control={control}
                    type="number"
                    label="Probability of appearance"
                    validators={[requiredValidator()]}
                    disabled={mode === FormMode.View}
                  />
                </div>
              </div>
            </div>

            {mode !== FormMode.View && (
              <>
                {renderError(error[TypeRewardConfig.Default])}
                {!!error[TypeRewardConfig.General] &&
                  renderError(error[TypeRewardConfig.General])}
              </>
            )}

            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <div className={styles['sub-title']}>Fragment rewards </div>
                <div className={styles['rewards']}>
                  {mode !== FormMode.View && (
                    <div className={styles['config']}>
                      <TextField
                        name="fragmentRewardConfig.min"
                        control={control}
                        type="number"
                        label="Min fragments amount"
                      />
                      <TextField
                        name="fragmentRewardConfig.max"
                        control={control}
                        type="number"
                        label="Max fragments amount"
                      />
                      <TextField
                        name="fragmentRewardConfig.probability"
                        control={control}
                        type="number"
                        label="Probability of appearance"
                      />
                      <TextField
                        name="fragmentRewardConfig.limit"
                        control={control}
                        type="number"
                        label="Limit"
                      />
                      {renderError(error[TypeRewardConfig.Coins])}
                      {renderAutoSumProbability(
                        probability[TypeRewardConfig.Coins],
                      )}
                      <Button
                        variant="contained"
                        onClick={() => submitReward(RewardType.Fragment)}
                      >
                        add
                      </Button>
                    </div>
                  )}

                  <div className={styles['rewards-generated']}>
                    {fragmentRewards.map((__, index) => (
                      <div
                        className={styles['created-config']}
                        key={`fragment-config-${index}`}
                      >
                        <RewardConfigurationContainer
                          formMethods={formMethods}
                          name={`fragmentRewards.${index}`}
                          disabled={mode !== FormMode.Edit}
                          rewardType={RewardType.Fragment}
                          changeField={() => {
                            formMethods.setValue(
                              'fragmentRewards',
                              formMethods.getValues().fragmentRewards,
                            );
                          }}
                        />
                        {mode !== FormMode.View && (
                          <Icon
                            className={styles['delete-button']}
                            onClick={() => removeFragmentConfig(index)}
                          >
                            delete
                          </Icon>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <div className={styles['sub-title']}>Custom rewards </div>
                <div className={styles['rewards']}>
                  {mode !== FormMode.View && (
                    <div className={styles['config']}>
                      <TextField
                        name="customPrizeRewardConfig.min"
                        control={control}
                        type="number"
                        label="Minimum amount"
                      />
                      <TextField
                        name="customPrizeRewardConfig.max"
                        control={control}
                        type="number"
                        label="Maximum amount"
                      />
                      <TextField
                        name="customPrizeRewardConfig.probability"
                        control={control}
                        type="number"
                        label="Probability of appearance"
                      />
                      <TextField
                        name="customPrizeRewardConfig.limit"
                        control={control}
                        type="number"
                        label="Limit"
                      />
                      <SelectField
                        name="customPrize"
                        label="Custom Prize"
                        control={control}
                        options={customPrizes}
                        getOptionLabel={({ id, name }) =>
                          [name, id].join(' | ')
                        }
                        isOptionEqualToValue={(optionA, optionB) =>
                          optionA.id === optionB.id
                        }
                      />
                      {renderError(error[TypeRewardConfig.CustomPrizes])}
                      {renderAutoSumProbability(
                        probability[TypeRewardConfig.CustomPrizes],
                      )}
                      <Button
                        variant="contained"
                        onClick={() => submitReward(RewardType.CustomPrize)}
                      >
                        add
                      </Button>
                    </div>
                  )}
                  <div className={styles['rewards-generated']}>
                    {customPrizeRewards.map((__, index) => (
                      <div
                        className={styles['created-config']}
                        key={`custom-prize-reward-${index}`}
                      >
                        <RewardConfigurationContainer
                          formMethods={formMethods}
                          name={`customPrizeRewards.${index}`}
                          disabled={mode !== FormMode.Edit}
                          options={customPrizes}
                          rewardType={RewardType.CustomPrize}
                          changeField={() => {
                            formMethods.setValue(
                              'customPrizeRewards',
                              formMethods.getValues().customPrizeRewards,
                            );
                          }}
                        />
                        {mode !== FormMode.View && (
                          <Icon
                            className={styles['delete-button']}
                            onClick={() => removeCustomPrizeConfig(index)}
                          >
                            delete
                          </Icon>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <div className={styles['sub-title']}>
                  Token attribute rewards
                </div>
                <div className={styles['rewards']}>
                  {mode !== FormMode.View && (
                    <div className={styles['config']}>
                      <TextField
                        name="tokenAttributeRewardConfig.min"
                        control={control}
                        type="number"
                        label="Minimum amount"
                      />
                      <TextField
                        name="tokenAttributeRewardConfig.max"
                        control={control}
                        type="number"
                        label="Maximum amount"
                      />
                      <TextField
                        name="tokenAttributeRewardConfig.probability"
                        control={control}
                        type="number"
                        label="Probability of appearance"
                      />
                      <TextField
                        name="tokenAttributeRewardConfig.limit"
                        control={control}
                        type="number"
                        label="Limit"
                      />
                      <SelectField
                        name="tokenAttribute"
                        label="Trait"
                        control={control}
                        options={tokenAttributes}
                        getOptionLabel={({ id, type, value }) =>
                          [type, value, id].join(' | ')
                        }
                        isOptionEqualToValue={(optionA, optionB) => {
                          return optionA.id === optionB.id;
                        }}
                      />
                      {renderError(error[TypeRewardConfig.TokenAttributes])}
                      {renderAutoSumProbability(
                        probability[TypeRewardConfig.TokenAttributes],
                      )}
                      <Button
                        variant="contained"
                        onClick={() => submitReward(RewardType.TokenAttribute)}
                      >
                        add
                      </Button>
                    </div>
                  )}
                  <div className={styles['rewards-generated']}>
                    {tokenAttributeRewards.map((__, index) => (
                      <div
                        className={styles['created-config']}
                        key={`token-reward-${index}`}
                      >
                        <RewardConfigurationContainer
                          formMethods={formMethods}
                          name={`tokenAttributeRewards.${index}`}
                          disabled={mode !== FormMode.Edit}
                          options={tokenAttributes}
                          rewardType={RewardType.TokenAttribute}
                          changeField={() => {
                            formMethods.setValue(
                              'tokenAttributeRewards',
                              formMethods.getValues().tokenAttributeRewards,
                            );
                          }}
                        />
                        {mode !== FormMode.View && (
                          <Icon
                            className={styles['delete-button']}
                            onClick={() => removeTokenAttributeConfig(index)}
                          >
                            delete
                          </Icon>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {mode !== FormMode.View &&
              renderError(
                error[TypeRewardConfig.General],
                styles['section-container'],
              )}

            <br />

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
