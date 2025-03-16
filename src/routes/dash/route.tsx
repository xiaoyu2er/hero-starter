import { createFileRoute, Outlet, redirect, useRouteContext, } from '@tanstack/react-router';

export const Route = createFileRoute('/dash')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context?.session) {
      throw redirect({ to: '/login' });
    }
  },
 
  
});

function RouteComponent() {
  const { session } = useRouteContext({ from: '/dash' });
  return (
    <div>
      <h1>Dashboard {session?.id}</h1>
      <Outlet />
    </div>
  );
}
