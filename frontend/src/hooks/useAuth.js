import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Convenience hook that gives access to the AuthContext.
 * Must be used inside <AuthProvider>.
 */
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}

export default useAuth;
