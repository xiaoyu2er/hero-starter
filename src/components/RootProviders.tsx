import { HeroUIProvider } from '@heroui/react';
import type * as React from 'react';

export function RootProviders({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
