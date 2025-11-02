'use client';
import React from 'react';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { LanguageProvider } from '@/lib/contexts/LanguageContext';
import { MuiThemeProviderWrapper } from './mui-theme-provider';
import { ActiveThemeProvider } from '../active-theme';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue?: string;
  children: React.ReactNode;
}) {
  return (
    <MuiThemeProviderWrapper>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </ActiveThemeProvider>
    </MuiThemeProviderWrapper>
  );
}
