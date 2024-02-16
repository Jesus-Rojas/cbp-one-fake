import { HttpStatusCode } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

export function useErrorHandler() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const validate = (status: HttpStatusCode, data: any) => {
    if (status === HttpStatusCode.Unauthorized) {
      showToast('Token not found or expired', 'error');
      navigate('/');
    }
    if (status === HttpStatusCode.UnprocessableEntity) {
      const message = data.errors
        .map((error: any) => Object.values(error).join('<br>'))
        .join('<br>');

      showToast(message, 'error');
    }
  };

  return {
    validate,
  };
}
