import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type * as React from 'react';
import { NotFound } from '~/components/NotFound';
import { RootProviders } from '~/components/RootProviders';
// @ts-ignore
import appCss from '~/styles/app.css?url';
import { seo } from '~/lib/seo';
import type { QueryClient } from '@tanstack/react-query';
import { cn } from '~/lib/cn';
import { querySessionOptions } from '~/lib/queries/auth';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';

type RootContext = {
  queryClient: QueryClient;
  // auth: ReturnType<typeof getSession>
};

export const Route = createRootRouteWithContext<RootContext>()({
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(querySessionOptions);
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description:
          'TanStack Start is a type-safe, client-first, full-stack React framework. ',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body
        className={cn(
          'relative min-h-screen w-full scroll-smooth bg-background antialiased'
        )}
      >
        <RootProviders>{children}</RootProviders>
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
