import { atom, useAtom } from 'jotai';

const accessTokenAtom = atom<string>('');

export function useAccessToken() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  return {
    accessToken,
    setAccessToken,
  };
}
