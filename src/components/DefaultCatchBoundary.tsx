import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { Button, Divider, Image } from '@heroui/react';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error('DefaultCatchBoundary Error:', error);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-8 text-center">
      <h3 className="mb-2 font-bold text-3xl">Sorry, something went wrong!</h3>
      
      <div className="max-w-md text-gray-600 dark:text-gray-400">
        <p>
          We encountered an error while processing your request. Our team has been notified.
        </p>
      </div>
      
      {process.env.NODE_ENV === 'development' && <div className="mt-4">
        <ErrorComponent error={error} />
      </div>}
      
      <Image
        src="/500.svg"
        alt="500 Error"
        className='mx-auto my-6 h-auto w-96'
      />

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          onPress={() => router.invalidate()}
          className="px-4 py-2 font-bold uppercase"
          variant="flat"
        >
          Try Again
        </Button>
        
        <Divider orientation="vertical" className="mx-1 h-6" />
        
        {isRoot ? (
          <Button
            as={Link}
            to="/"
            color="primary"
            className="px-4 py-2 font-bold uppercase"
          >
            Go to Home
          </Button>
        ) : (
          <Button
            onPress={() => window.history.back()}
            color="primary"
            className="px-4 py-2 font-bold uppercase"
          >
            Go Back
          </Button>
        )}
      </div>
    </div>
  );
}
