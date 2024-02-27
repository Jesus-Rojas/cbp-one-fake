import { atom, useAtom } from 'jotai';

const keyAccessToken = 'accessToken';
const accessTokenAtom = atom(localStorage.getItem(keyAccessToken) || '');

export function useAccessToken() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  const updateToken = (newToken: string) => {
    localStorage.setItem(keyAccessToken, newToken);
    setAccessToken(newToken);
  };

  return {
    accessToken,
    updateToken,
  };
}
