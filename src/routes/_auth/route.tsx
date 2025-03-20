import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4">
      <Outlet />
    </div>
  );
}
