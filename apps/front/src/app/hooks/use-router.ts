import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  function goToLogin() {
    navigate('/login');
  }

  function goToTermsAndConditions() {
    navigate('/terms-and-conditions');
  }

  function goToHome() {
    navigate('/home');
  }

  function goToTicket() {
    navigate('/ticket');
  }

  function goToExternalSite(url: string) {
    window.open(url, '_blank');
  }

  function back() {
    navigate(-1);
  }

  return {
    back: useCallback(back, [navigate]),
    goToLogin: useCallback(goToLogin, [navigate]),
    goToTicket: useCallback(goToTicket, [navigate]),
    goToTermsAndConditions: useCallback(goToTermsAndConditions, [navigate]),
    goToHome: useCallback(goToHome, [navigate]),
    goToExternalSite: useCallback(goToExternalSite, []),
    currentRoute: useMemo(() => location.pathname, [location.pathname]),
  };
}
