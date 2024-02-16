import { Alert, Snackbar } from '@mui/material';
import { useToast } from '../../hooks/use-toast';

export function Toast() {
  const { toast, closeToast } = useToast();
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={toast.isOpen}
      onClose={closeToast}
      autoHideDuration={toast.duration}
    >
      <Alert onClose={closeToast} severity={toast.severity} icon={false}>
        <span dangerouslySetInnerHTML={{ __html: toast.message || '' }} />
      </Alert>
    </Snackbar>
  );
}
