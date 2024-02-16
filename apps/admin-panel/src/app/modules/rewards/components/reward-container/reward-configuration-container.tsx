import { TextField as MuiTextField } from '@mui/material';
import { SelectField, TextField } from '@zooverse/ui-forms';
import {
  CustomPrizeDTO,
  RewardType,
  TokenAttributeDTO,
} from '@zooverse/api-interfaces';
import { UseFormReturn } from 'react-hook-form';

export interface RewardConfigurationContainerProps {
  name: string;
  formMethods: UseFormReturn<any, any>;
  disabled: boolean;
  options?: (TokenAttributeDTO | CustomPrizeDTO)[];
  rewardType: RewardType;
  changeField: () => void;
}
export function RewardConfigurationContainer(
  props: RewardConfigurationContainerProps,
) {
  const { options, name, formMethods, disabled, rewardType, changeField } =
    props;
  const { control, watch } = formMethods;
  const tokenAttribute = watch(`${name}.tokenAttribute`) as TokenAttributeDTO;
  const customPrize = watch(`${name}.customPrize`) as CustomPrizeDTO;

  return (
    <>
      <TextField
        name={`${name}.min`}
        control={control}
        type="number"
        label="min"
        disabled={disabled}
      />
      <TextField
        name={`${name}.max`}
        control={control}
        type="number"
        label="max"
        disabled={disabled}
      />
      <TextField
        name={`${name}.probability`}
        control={control}
        type="number"
        label="probability"
        disabled={disabled}
      />
      <TextField
        name={`${name}.limit`}
        control={control}
        type="number"
        label="Limit"
        disabled={disabled}
      />
      {rewardType === RewardType.CustomPrize && (
        <>
          {disabled && (
            <MuiTextField
              disabled
              value={[customPrize.id, customPrize.name].join(' | ')}
            />
          )}
          {!disabled && (
            <SelectField
              name={`${name}.customPrize`}
              label="Custom Prize"
              control={control}
              options={options as CustomPrizeDTO[]}
              getOptionLabel={({ id, name }) => [name, id].join(' | ')}
              isOptionEqualToValue={(optionA, optionB) =>
                optionA.id === optionB.id
              }
              onChange={changeField}
            />
          )}
        </>
      )}

      {rewardType === RewardType.TokenAttribute && (
        <>
          {disabled && (
            <MuiTextField
              disabled
              value={[
                tokenAttribute.id,
                tokenAttribute.type,
                tokenAttribute.value,
              ].join(' | ')}
            />
          )}
          {!disabled && (
            <SelectField
              name={`${name}.tokenAttribute`}
              label="Trait"
              control={control}
              options={options as TokenAttributeDTO[]}
              getOptionLabel={({ id, type, value }) =>
                [type, value, id].join(' | ')
              }
              isOptionEqualToValue={(optionA, optionB) =>
                optionA.id === optionB.id
              }
              onChange={changeField}
            />
          )}
        </>
      )}
    </>
  );
}
