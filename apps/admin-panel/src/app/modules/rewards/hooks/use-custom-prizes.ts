import { atom, useAtom } from 'jotai';
import { useCustomPrizeApi } from './use-custom-prize-api';
import { CustomPrizeDTO } from '@zooverse/api-interfaces';

const customPrizesAtom = atom<CustomPrizeDTO[]>([]);
const customPrizeAtom = atom<CustomPrizeDTO>({} as CustomPrizeDTO);
const loadingAtom = atom(false);

export function useCustomPrizes() {
  const {
    getCustomPrizes,
    deleteCustomPrize,
    createCustomPrize,
    updateCustomPrize,
  } = useCustomPrizeApi();
  const [customPrizes, setCustomPrizes] = useAtom(customPrizesAtom);
  const [customPrize, setCustomPrize] = useAtom(customPrizeAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  async function syncCustomPrizes() {
    setLoading(true);
    try {
      const response = await getCustomPrizes();
      setCustomPrizes(response.customPrizes);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  async function findById(id: number) {
    const customPrize = customPrizes.find(
      (customPrize) => customPrize.id === id,
    );
    if (customPrize) {
      setCustomPrize(customPrize);
    }
  }

  async function deletePrize(id: number) {
    setLoading(true);
    try {
      await deleteCustomPrize(id);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  async function createPrize(data: FormData) {
    setLoading(true);
    try {
      await createCustomPrize(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  async function updatePrize(id: number, data: FormData) {
    setLoading(true);
    try {
      await updateCustomPrize(id, data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return {
    customPrizes,
    customPrize,
    syncCustomPrizes,
    findById,
    deletePrize,
    createPrize,
    updatePrize,
    loading,
  };
}
