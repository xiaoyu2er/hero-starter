import { HeroUIProvider } from '@heroui/react';
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
      <HeroUIProvider>{children}</HeroUIProvider>
    </ThemeProvider>
  );
}
