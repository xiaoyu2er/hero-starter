import { createFileRoute, useRouteContext } from '@tanstack/react-router';
import HomePage from '~/pages/index';

export const Route = createFileRoute('/_www/')({
  component: Home,
});

function Home() {
  const { session, user } = useRouteContext({ from: '/_www/' });

  return (
    <HomePage />
  );
}
