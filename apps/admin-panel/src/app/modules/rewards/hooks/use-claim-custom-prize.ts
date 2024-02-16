import { atom, useAtom } from 'jotai';
import {
  ClaimCustomPrizeDTO,
  CreateClaimCustomPrize,
  DeliverCustomPrize,
} from '@zooverse/api-interfaces';
import { useClaimCustomPrizeApi } from './use-claim-custom-prize-api';

const customPrizeClaimsAtom = atom<ClaimCustomPrizeDTO[]>([]);
const customPrizeClaimAtom = atom<ClaimCustomPrizeDTO>(
  {} as ClaimCustomPrizeDTO,
);
const loadingAtom = atom(false);

export function useClaimCustomPrize() {
  const {
    createCustomPrizeClaim,
    getCustomPrizeClaims,
    updateCustomPrizeClaim,
    deleteCustomPrizeClaim,
    deliverCustomPrize,
  } = useClaimCustomPrizeApi();
  const [customPrizeClaims, setCustomPrizeClaims] = useAtom(
    customPrizeClaimsAtom,
  );
  const [customPrizeClaim, setCustomPrizeClaim] = useAtom(customPrizeClaimAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  const create = async (data: CreateClaimCustomPrize) => {
    setLoading(true);
    try {
      await createCustomPrizeClaim(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const deliver = async (data: DeliverCustomPrize) => {
    setLoading(true);
    try {
      const response = await deliverCustomPrize(data);
      setLoading(false);
      return response;
    } catch {
      setLoading(false);
    }
  };

  const findByCode = (code: string) => {
    const claimCustomPrize = customPrizeClaims.find(
      (claimCustomPrize) => claimCustomPrize.code === code,
    );
    if (claimCustomPrize) {
      setCustomPrizeClaim(claimCustomPrize);
    }
  };

  const findById = (id: number) => {
    const claimCustomPrize = customPrizeClaims.find(
      (claimCustomPrize) => claimCustomPrize.id === id,
    );
    if (claimCustomPrize) {
      setCustomPrizeClaim(claimCustomPrize);
    }
  };

  const generateCode = () => {
    const code = Math.floor(Math.random() * 101);
    return code.toString().trim().toLocaleLowerCase();
  };

  const remove = async (id: number) => {
    setLoading(true);
    try {
      await deleteCustomPrizeClaim(id);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const syncCustomPrizeClaims = async () => {
    setLoading(true);
    try {
      const response = await getCustomPrizeClaims();
      setCustomPrizeClaims(response.customPrizesInClaimProcess);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const update = async (id: number, data: Partial<ClaimCustomPrizeDTO>) => {
    setLoading(true);
    try {
      const body = {
        code: data.code,
        customPrizeId: data.customPrizeId,
        claimerAddress: data.claimerAddress,
        deliveryStatus: data.deliveryStatus,
      };
      const response = await updateCustomPrizeClaim(id, body);
      setLoading(false);
      return response;
    } catch {
      setLoading(false);
    }
  };

  return {
    create,
    customPrizeClaims,
    customPrizeClaim,
    deliver,
    findByCode,
    findById,
    generateCode,
    loading,
    remove,
    syncCustomPrizeClaims,
    update,
  };
}
