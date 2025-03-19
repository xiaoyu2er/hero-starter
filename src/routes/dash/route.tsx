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
    <div>
      <h1>Dashboard {user.email}</h1>
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
