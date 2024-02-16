import {
  CreateRewardConfigTableDTO,
  RewardConfigTableDTO,
  UpdateRewardConfigTableDTO,
} from '@zooverse/api-interfaces';
import { useRewardConfigApi } from './use-rewards-config-api';
import { atom, useAtom } from 'jotai';

const rewardConfigTablesAtom = atom<RewardConfigTableDTO[]>([]);
const rewardConfigAtom = atom<RewardConfigTableDTO>({} as RewardConfigTableDTO);
const loadingAtom = atom(false);

export function useRewardTable() {
  const {
    getRewardConfigTables,
    createRewardConfigTable,
    deleteRewardConfigTable,
    updateRewardConfigTable,
  } = useRewardConfigApi();
  const [rewardConfigTables, setRewardConfigTables] = useAtom(
    rewardConfigTablesAtom,
  );
  const [rewardConfig, setRewardConfig] = useAtom(rewardConfigAtom);

  const [loading, setLoading] = useAtom(loadingAtom);

  async function syncRewardConfigTables() {
    setLoading(true);
    try {
      const response = await getRewardConfigTables();
      setRewardConfigTables(response.rewardConfigTables);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  function findById(id: number) {
    const rewardConfig = rewardConfigTables.find(
      (rewardConfigTable) => rewardConfigTable.id === id,
    );
    if (rewardConfig) {
      setRewardConfig(rewardConfig);
    }
  }

  async function createRewardConfig(body: CreateRewardConfigTableDTO) {
    try {
      setLoading(true);
      await createRewardConfigTable(body);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  }

  async function deleteRewardConfig(id: number) {
    try {
      setLoading(true);
      await deleteRewardConfigTable(id);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  async function updateRewardConfig(
    id: number,
    body: UpdateRewardConfigTableDTO,
  ) {
    try {
      setLoading(true);
      await updateRewardConfigTable(id, body);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return {
    syncRewardConfigTables,
    rewardConfigTables,
    loading,
    findById,
    rewardConfig,
    createRewardConfig,
    deleteRewardConfig,
    updateRewardConfig,
    setRewardConfig,
  };
}
