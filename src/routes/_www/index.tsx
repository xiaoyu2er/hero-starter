import { createFileRoute, useRouteContext } from '@tanstack/react-router';
import HomeHero from '~/pages/home-hero';

export const Route = createFileRoute('/_www/')({
  component: Home,
});

function Home() {
  const { session, user } = useRouteContext({ from: '/_www/' });

  return <HomeHero />;
}
