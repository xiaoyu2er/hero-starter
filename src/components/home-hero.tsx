import { Button, Divider } from '@heroui/react';
import { ChevronRight } from 'lucide-react';
import { Link as RouterLink } from '@tanstack/react-router';

export default function HomeHero() {
  return (
    <section className="container mx-auto mt-20 mb-20 flex flex-col items-center gap-6 bg-background p-8 text-center">
      <Button
        className="border-1"
        variant="ghost"
        radius="full"
        size="sm"
        endContent={
          <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-all duration-300 ease-out group-hover:translate-x-1" />
        }
      >
        🚀
        <Divider className="mx-2 h-3" orientation="vertical" />
        Introducing Hero TanStack Starter!
      </Button>

      <div className="flex flex-col items-center gap-8 px-4 text-center">
        <h1 className='flex flex-col items-center gap-3 font-black text-4xl uppercase [letter-spacing:-.05em] md:flex-row md:text-5xl lg:text-6xl xl:text-7xl'>
          <span className="bg-gradient-to-r from-primary-500 to-cyan-500 bg-clip-text text-transparent">
            Hero
          </span>
          <span>TanStack Starter</span>
        </h1>
        <div className='animate-bounce whitespace-nowrap rounded-md bg-black px-2 py-1 align-super font-black text-white text-xs uppercase leading-none shadow-black/30 shadow-sm md:text-base dark:bg-white dark:text-black'>
          Status: Alpha
        </div>
        <h2 className="max-w-md font-bold text-2xl md:text-3xl lg:max-w-2xl lg:text-4xl">
          Modern full-stack React starter{' '}
          <span className="underline decoration-3 decoration-yellow-500 decoration-dashed underline-offset-2">
            with powerful integrations
          </span>{' '}
        </h2>
        <p className="text max-w-[500px] opacity-90 lg:max-w-[600px] lg:text-xl">
          Combining <strong>TanStack Start</strong>, <strong>HeroUI</strong>,
          and <strong>Better-Auth</strong> for a comprehensive solution with
          SSR, streaming, authentication, and beautiful UI components. Fully
          type-safe and deployment ready.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            as={RouterLink}
            to="/login"
            color="primary"
            className="px-4 py-2 font-bold uppercase"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
