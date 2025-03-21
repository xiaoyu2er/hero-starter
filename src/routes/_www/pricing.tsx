import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_www/pricing')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_www/pricing"!</div>;
}
