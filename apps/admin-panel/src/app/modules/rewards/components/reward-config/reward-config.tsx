import {
  CustomPrizeRewardConfigDTO,
  DefaultRewardConfigDTO,
  RewardConfigDTO,
  TokenAttributeRewardConfigDTO,
} from '@zooverse/api-interfaces';
import styles from './reward-config.module.scss';

export interface RewardConfigProps {
  config: RewardConfigDTO | DefaultRewardConfigDTO;
}

export function RewardConfig(props: RewardConfigProps) {
  const { config } = props;
  const { min, max, probability, delivered } = config;
  const isLimitedConfig = (
    config: RewardConfigDTO | DefaultRewardConfigDTO,
  ): config is RewardConfigDTO => {
    return (config as RewardConfigDTO).limit !== undefined;
  };
  const isCustomPrizeConfig = (
    config: RewardConfigDTO | DefaultRewardConfigDTO,
  ): config is CustomPrizeRewardConfigDTO => {
    return (config as CustomPrizeRewardConfigDTO).customPrize !== undefined;
  };

  const isTokenAttributeConfig = (
    config: RewardConfigDTO | DefaultRewardConfigDTO,
  ): config is TokenAttributeRewardConfigDTO => {
    return (
      (config as TokenAttributeRewardConfigDTO).tokenAttribute !== undefined
    );
  };

  return (
    <div className={styles['container']}>
      <div className={styles['base']}>
        <div>
          min: <span>{min}</span>
        </div>
        <div>
          max: <span>{max}</span>
        </div>
        <div>
          probability: <span>{probability}</span>
        </div>
        <div>
          delivered: <span>{delivered}</span>
        </div>
        {isLimitedConfig(config) && (
          <div>
            limit: <span>{config.limit}</span>
          </div>
        )}
      </div>
      <div className={styles['prize']}>
        {isCustomPrizeConfig(config) && (
          <div>
            prize: <span>{config.customPrize.name}</span>
          </div>
        )}
        {isTokenAttributeConfig(config) && (
          <>
            <div>Attribute:</div>
            <div>
              <span>
                {config.tokenAttribute.type}
                <br />
                {config.tokenAttribute.value}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
