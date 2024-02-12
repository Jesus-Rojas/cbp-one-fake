import { useAtom, atom } from "jotai";

const showAppAtom = atom(false);
const showFormAtom = atom(true);
const showTextInformationAtom = atom(false);

export function useToggle() {
  const [showApp, setShowApp] = useAtom(showAppAtom);
  const [showForm, setShowForm] = useAtom(showFormAtom);
  const [showTextInformation, setShowTextInformation] = useAtom(showTextInformationAtom);

  const openForm = () => {
    setShowApp(false);
    setShowForm(true);
    setShowTextInformation(false);
  }

  const openTextInformation = () => {
    setShowApp(false);
    setShowForm(false);
    setShowTextInformation(true);
  }

  const openApp = () => {
    setShowApp(true);
    setShowForm(false);
    setShowTextInformation(false);
  }

  return {
    showApp,
    showForm,
    showTextInformation,
    openApp,
    openForm,
    openTextInformation,
  };
}
