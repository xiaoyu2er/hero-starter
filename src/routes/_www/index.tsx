import { createFileRoute } from '@tanstack/react-router';
import HomeHero from '~/components/home-hero';

export const Route = createFileRoute('/_www/')({
  component: Home,
});

function Home() {
  return <HomeHero />;
}
