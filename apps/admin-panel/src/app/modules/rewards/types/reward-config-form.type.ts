import {
  DefaultRewardConfigDTO,
  FragmentRewardConfigDTO,
  TokenAttributeRewardConfigDTO,
  CustomPrizeRewardConfigDTO,
  TokenAttributeDTO,
  CustomPrizeDTO,
} from '@zooverse/api-interfaces';
import { LimitedRewardConfig } from './limited-reward-config.interface';
import { Dayjs } from 'dayjs';

export type RewardConfigForm = {
  name: string;
  startAt: Dayjs;
  finishAt: Dayjs;
  tokenAttributeRewardConfig: LimitedRewardConfig;
  fragmentRewardConfig: LimitedRewardConfig;
  customPrizeRewardConfig: LimitedRewardConfig;
  defaultRewardConfig: DefaultRewardConfigDTO;
  fragmentRewards: FragmentRewardConfigDTO[];
  tokenAttributeRewards: TokenAttributeRewardConfigDTO[];
  customPrizeRewards: CustomPrizeRewardConfigDTO[];
  customPrizeId: number;
  customPrize?: CustomPrizeDTO;
  tokenAttributeId: number;
  tokenAttribute?: TokenAttributeDTO;
};
