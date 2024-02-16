import { atom, useAtom } from 'jotai';
import { CustomPrizeBalanceDTO } from '@zooverse/api-interfaces';
import { useCustomPrizeBalanceApi } from './use-custom-prize-balance-api';

interface BalanceDataTableInterface {
  amount: number;
  name: string;
  customPrizeId: number;
  userAddress: string;
}

const completeBalancesAtom = atom<CustomPrizeBalanceDTO[]>([]);
const customPrizesWinnersAtom = atom<BalanceDataTableInterface[]>([]);
const loadingAtom = atom(false);

export function useCustomPrizesWinners() {
  const { getCustomPrizeBalance } = useCustomPrizeBalanceApi();
  const [completeBalances, setCompleteBalances] = useAtom(completeBalancesAtom);
  const [customPrizesWinners, setCustomPrizesWinners] = useAtom(
    customPrizesWinnersAtom,
  );
  const [loading, setLoading] = useAtom(loadingAtom);

  const syncCustomPrizeWinners = async () => {
    setLoading(true);
    try {
      const balances = await getCustomPrizeBalance();
      setCompleteBalances(balances.customPrizeBalance);
      const balancesDataTable = balances.customPrizeBalance.map((balance) => ({
        amount: balance.amount,
        name: balance.customPrize.name,
        customPrizeId: balance.customPrize.id,
        userAddress: balance.user!.address,
      }));
      setCustomPrizesWinners(balancesDataTable);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return {
    completeBalances,
    customPrizesWinners,
    loading,
    syncCustomPrizeWinners,
  };
}
