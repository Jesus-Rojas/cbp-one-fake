import { useAtom, atom } from "jotai";

const isLoadingAtom = atom(false);

export function useLoading() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const open = () => setIsLoading(true);
  const close = () => setIsLoading(false);

  return {
    isLoading,
    open,
    close,
  };
}
