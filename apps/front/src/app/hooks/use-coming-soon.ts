import { useAtom, atom } from "jotai";

const isComingSoonAtom = atom(false);

export function useComingSoon() {
  const [isComingSoon, setIsComingSoon] = useAtom(isComingSoonAtom);

  const open = () => setIsComingSoon(true);
  const close = () => setIsComingSoon(false);

  return {
    isComingSoon,
    open,
    close,
  };
}
