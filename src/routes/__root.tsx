import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type * as React from 'react';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { NotFound } from '~/components/NotFound';
import { RootProviders } from '~/components/RootProviders';
// @ts-ignore
import appCss from '~/styles/app.css?url';
import { seo } from '~/lib/seo';
import { getWebRequest } from '@tanstack/react-start/server';
import { auth } from '~/lib/auth';
import type { QueryClient } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';

const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const { headers } = getWebRequest()!;
  const session = await auth.api.getSession({ headers });
  return session;
});

type RootContext = {
  queryClient: QueryClient;
} & Awaited<ReturnType<typeof getSession>>;

export const Route = createRootRouteWithContext<RootContext>()({
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.fetchQuery({
      queryKey: ['session'],
      queryFn: ({ signal }) => getSession({ signal }),
    });
    return session;
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
        description: 'TanStack Start is a type-safe, client-first, full-stack React framework. ',
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
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <RootProviders>
          <div className="flex gap-2 p-2 text-lg">
            <Link
              to="/"
              activeProps={{
                className: 'font-bold',
              }}
              activeOptions={{ exact: true }}
            >
              Home
            </Link>{' '}
          </div>
          <hr />
          {children}
        </RootProviders>
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
