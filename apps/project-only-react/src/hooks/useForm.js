import { useAtom, atom } from "jotai";

const dateAtom = atom("");
const timeAtom = atom("");
const lugarAtom = atom("");
const viajerosAtom = atom([]);
const viajeroSelectedAtom = atom(null);

export function useForm() {
  const [date, setDate] = useAtom(dateAtom);
  const [time, setTime] = useAtom(timeAtom);
  const [lugar, setLugar] = useAtom(lugarAtom);
  const [viajeros, setViajeros] = useAtom(viajerosAtom);
  const [viajeroSelected, setViajeroSelected] = useAtom(viajeroSelectedAtom);

  return {
    date,
    setDate,
    time,
    setTime,
    lugar,
    setLugar,
    viajeros,
    setViajeros,
    viajeroSelected,
    setViajeroSelected,
  };
}
