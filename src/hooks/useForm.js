import { useAtom, atom } from "jotai";

const dateAtom = atom("");
const timeAtom = atom("");
const lugarAtom = atom("");

export function useForm() {
  const [date, setDate] = useAtom(dateAtom);
  const [time, setTime] = useAtom(timeAtom);
  const [lugar, setLugar] = useAtom(lugarAtom);

  return {
    date,
    setDate,
    time,
    setTime,
    lugar,
    setLugar,
  };
}
