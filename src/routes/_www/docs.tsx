import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_www/docs')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_www/docs"!</div>;
}
