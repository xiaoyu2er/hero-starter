import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';
import { ThemeProvider } from 'next-themes';
import type * as React from 'react';

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HeroUIProvider>
        <ToastProvider />
        {children}
      </HeroUIProvider>
    </ThemeProvider>
  );
}
