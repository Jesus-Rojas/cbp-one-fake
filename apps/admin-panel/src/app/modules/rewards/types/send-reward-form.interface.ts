import {
  CustomPrizeDTO,
  RewardType,
  TokenAttributeDTO,
} from '@zooverse/api-interfaces';

export interface SendRewardForm {
  customPrize: CustomPrizeDTO;
  tokenAttribute: TokenAttributeDTO;
  address: string;
  amount: number;
  rewardType: RewardType;
}
