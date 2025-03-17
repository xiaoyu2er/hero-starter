import { Button, Divider } from '@heroui/react';
import { ChevronRight } from 'lucide-react';

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

      <h1 className="font-bold text-[clamp(40px,10vw,44px)] leading-tight tracking-tighter sm:text-[64px]">
        <span className="bg-hero-section-title bg-clip-text">
          The modern way to <br /> build React applications
        </span>
      </h1>

      <p className="text-default-700 sm:w-[566px] sm:text-[18px]">
        Build beautiful React apps with TanStack, HeroUI, and better-auth. 
        Own your data without relying on third-party SaaS platforms.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <Button
          color="primary"
          endContent={
            <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
          }
        >
          Get Started
        </Button>
        <Button
          className="border-1"
          variant="ghost"
          endContent={
            <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
          }
        >
          Learn More
        </Button>
      </div>
    </section>
  );
}
