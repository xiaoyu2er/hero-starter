import { Link, useRouter } from '@tanstack/react-router';
import { Button, Divider, Image } from '@heroui/react';

export function NotFound({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-8 text-center">
      <h3 className="mb-2 font-bold text-3xl">Sorry, page not found!</h3>

      <div className="max-w-md text-gray-600 dark:text-gray-400">
        {children || (
          <p>
            Sorry, we couldn't find the page you're looking for. Perhaps you've
            mistyped the URL? Be sure to check your spelling.
          </p>
        )}
      </div>
      <Image
        src="/404.svg"
        alt="404"
        className="mx-auto h-auto w-96"
      />

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          onPress={() => router.history.back()}
          className="px-4 py-2 font-bold uppercase"
          variant="flat"
        >
          Go back
        </Button>
        <Divider orientation="vertical" className="mx-1 h-6" />
        <Button
          as={Link}
          to="/"
          color="primary"
          className="px-4 py-2 font-bold uppercase"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
