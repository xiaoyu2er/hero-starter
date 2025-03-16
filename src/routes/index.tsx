import { createFileRoute, useRouteContext } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const { session, user } = useRouteContext({ from: '/' });

  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
