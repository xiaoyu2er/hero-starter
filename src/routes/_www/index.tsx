import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import HomeHero from '~/components/home-hero';
import { authClient } from '~/lib/auth-client';
import { querySessionOptions } from '~/lib/queries/auth';

export const Route = createFileRoute('/_www/')({
  component: Home,
});

function Home() {
  const { data, isLoading } = useQuery(querySessionOptions);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if(!isLoading && !data?.session) {
      console.log('~init one tap');
      authClient.oneTap({
        fetchOptions: {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['session'] });
            navigate({ to: '/dash' });
          },
        },
      });
    }
    
  }, [isLoading, data?.session]);

  return <HomeHero />;
}
