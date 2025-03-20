import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/error')({
  loader: () => {
    throw new Error('Test error');
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/error"!</div>;
}
