import { atom, useAtom } from 'jotai';
import { GenerationType, TokenAttributeDTO } from '@zooverse/api-interfaces';
import { useTokenAttributeApi } from './use-token-attribute.api';

const tokenAttributesAtom = atom<TokenAttributeDTO[]>([]);
const loadingAtom = atom(false);

export function useTokenAttributes() {
  const { getTokenAttributes } = useTokenAttributeApi();
  const [tokenAttributes, setTokenAttributes] = useAtom(tokenAttributesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  async function syncTokenAttributes() {
    try {
      setLoading(true);
      const response = await getTokenAttributes();
      setTokenAttributes(
        response.attributes.filter(
          (attribute) =>
            attribute.generationType === GenerationType.GenerationTwo,
        ),
      );
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }
  return {
    loading,
    tokenAttributes,
    syncTokenAttributes,
  };
}
