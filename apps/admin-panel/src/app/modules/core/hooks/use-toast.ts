import { AlertColor } from '@mui/material';
import { atom, useAtom } from 'jotai';

interface ToastAtom {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
  duration: number;
}

const defaultToast: ToastAtom = {
  isOpen: false,
  message: '',
  severity: 'success',
  duration: 20000,
};

const toastAtom = atom(defaultToast);

export function useToast() {
  const [toast, setToast] = useAtom(toastAtom);
  const showToast = (
    message: string,
    severity: AlertColor = defaultToast.severity,
    duration = defaultToast.duration,
  ) => {
    setToast({
      isOpen: true,
      message,
      severity,
      duration,
    });
  };

  const closeToast = () => {
    setToast((prevState) => ({ ...prevState, isOpen: false }));
  };

  return {
    showToast,
    closeToast,
    toast,
  };
}
