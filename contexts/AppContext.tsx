// contexts/AppContext.tsx

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  loading: boolean; // Tracks if the app is loading
  setLoading: (value: boolean) => void;
  scrollState: number; // Tracks the scroll progress
  setScrollState: (value: number) => void;
}

const initialState: AppContextType = {
  loading: true,
  setLoading: () => {},
  scrollState: 0,
  setScrollState: () => {}
};

const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true); // App loading state
  const [scrollState, setScrollState] = useState(0); // Scroll progress state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const value = {
    loading,
    setLoading,
    scrollState,
    setScrollState
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};