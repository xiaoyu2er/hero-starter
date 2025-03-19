import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router';
import { querySessionOptions } from '~/lib/queries/auth';
import { useQueryClient } from '@tanstack/react-query';

import { AppSidebar } from '~/components/dash/app-sidebar';
import { AppHeader } from '~/components/dash/app-header';
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
  const { user } = useRouteContext({ from: '/dash' });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
