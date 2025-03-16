import { Button } from '@heroui/react';
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router';
import { authClient } from '~/lib/auth-client';
import { querySessionOptions } from '~/lib/queries/auth';
import { useQueryClient } from '@tanstack/react-query';

export const Route = createFileRoute('/dash')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.fetchQuery(querySessionOptions);
    if (!session?.session) {
      throw redirect({ to: '/login' });
    }
    return session;
  },
});

function RouteComponent() {
  const { session } = useRouteContext({ from: '/dash' });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <div>
      <h1>Dashboard {session.id}</h1>
      <Outlet />
      <Button
        color="primary"
        onPress={() => {
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['session'] });
                navigate({ to: '/' });
              },
            },
          });
        }}
      >
        Logout
      </Button>
    </div>
  );
}
