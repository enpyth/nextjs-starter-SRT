'use client';
import React from 'react';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { LanguageProvider } from '@/lib/contexts/LanguageContext';

export default function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LanguageProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </LanguageProvider>
    </>
  );
}
