import { useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from './useRedux';
import { setUser } from '../store/slices/authSlice';
import type { User } from '../types';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // For development: Check if we should use mock authentication
    const useMockAuth = process.env.NODE_ENV === 'development';
    
    if (useMockAuth) {
      // Simulate a delay for authentication check
      const timer = setTimeout(() => {
        // Auto-login with mock user for development
        const mockUser: User = {
          uid: 'mock-user-id',
          email: 'demo@example.com',
          displayName: 'Demo User',
          photoURL: '',
        };
        dispatch(setUser(mockUser));
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // Normal Firebase authentication for production
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData: User = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
          };
          dispatch(setUser(userData));
        } else {
          dispatch(setUser(null));
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [dispatch]);

  return { loading };
};