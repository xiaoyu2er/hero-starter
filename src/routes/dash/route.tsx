import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { AppHeader } from '~/components/dash/app-header';
import { AppSidebar } from '~/components/dash/app-sidebar';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { querySessionOptions } from '~/lib/queries/auth';

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
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100 backdrop-saturate-150 dark:bg-black/30">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider className="flex h-full flex-col">
          <div className="flex h-full flex-1 pr-4 pb-4 md:pr-6 md:pb-6">
            <AppSidebar />
            <SidebarInset className="flex flex-1 flex-col overflow-hidden rounded-xl">
              <div className="h-full rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
                <Outlet />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
