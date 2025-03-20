import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dash/a')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dash/a"!</div>;
}
