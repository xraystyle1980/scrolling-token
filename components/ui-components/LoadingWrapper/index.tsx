'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import Loading from '@/components/ui-components/Loading';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const { loading } = useAppContext();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
} 