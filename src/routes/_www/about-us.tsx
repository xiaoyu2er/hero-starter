import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_www/about-us')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_www/about-us"!</div>;
}
