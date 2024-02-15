import { useAtom, atom } from "jotai";

const isLoadingAtom = atom(false);

export function useLoading() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  return {
    isLoading,
    setIsLoading,
  };
}
