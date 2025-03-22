import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { querySessionOptions } from '~/lib/queries/auth';

import { AppHeader } from '~/components/dash/app-header';
import { AppSidebar } from '~/components/dash/app-sidebar';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';

export const Route = createFileRoute('/dash')({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    const session = await context.queryClient.fetchQuery(querySessionOptions);
    if (!session?.session) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
    return session;
  },
});

function RouteComponent() {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
