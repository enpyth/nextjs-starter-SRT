'use client';

import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useTheme } from 'next-themes';

// Create base MUI theme with proper breakpoints and system configuration
// This ensures all MUI internal functions are available
const getMuiTheme = (mode: 'light' | 'dark' = 'light') => {
  const theme = createTheme({
    palette: {
      mode,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  
  // Ensure theme has all required system properties
  return theme;
};

export function MuiThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Determine theme mode - default to light during SSR
  const themeMode = React.useMemo(() => {
    if (!mounted) return 'light'; // SSR safe default
    return resolvedTheme === 'dark' ? 'dark' : 'light';
  }, [mounted, resolvedTheme]);

  const muiTheme = React.useMemo(() => getMuiTheme(themeMode), [themeMode]);

  // Only render MUI ThemeProvider when mounted to avoid SSR issues
  if (!mounted) {
    // Return a simple wrapper during SSR with light theme
    return (
      <MuiThemeProvider theme={getMuiTheme('light')}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

