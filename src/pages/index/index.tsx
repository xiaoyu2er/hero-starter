import {Button} from "@heroui/react";
import {Icon} from "@iconify/react";

import BasicNavbar from "./basic-navbar";

export default function HomePage() {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-background">
      <BasicNavbar />
      
      <main className="container mx-auto flex flex-1 items-center justify-center px-8">
        <section className="flex flex-col items-center gap-6 text-center">
          <Button
            className='h-9 border-1 border-default-100 bg-default-50 px-[18px] text-default-500 text-small'
            endContent={<Icon icon="solar:arrow-right-linear" width={20} />}
            radius="full"
            variant="bordered"
          >
            New onboarding experience
          </Button>
          
          <h1 className="font-bold text-[clamp(40px,10vw,44px)] leading-tight tracking-tighter sm:text-[64px]">
            <span className="bg-hero-section-title bg-clip-text">
              Easiest way to <br /> power global teams.
            </span>
          </h1>
          
          <p className="text-default-500 sm:w-[466px] sm:text-[18px]">
            Acme makes running global teams simple. HR, Payroll, International Employment,
            contractor management and more.
          </p>
          
          <div className="flex flex-col gap-6 sm:flex-row">
            <Button
              className='h-10 w-[163px] bg-default-foreground text-background text-small'
              radius="full"
            >
              Get Started
            </Button>
            
            <Button
              className="h-10 w-[163px] border-1 border-default-100 text-small"
              endContent={
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100">
                  <Icon icon="solar:arrow-right-linear" width={16} className="text-default-500" />
                </span>
              }
              radius="full"
              variant="bordered"
            >
              See our plans
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
