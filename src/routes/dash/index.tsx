import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dash/')({
  component: RouteComponent,
});

import { Button, Card, CardFooter, CardHeader, Image } from '@heroui/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';

function RouteComponent() {
  return (
    <div className="container mx-auto flex flex-col gap-8 p-8 md:flex-row">
      <Card className="h-[300px] w-full flex-grow">
        <CardHeader className="absolute top-1 z-10 flex-col items-start">
          <p className="font-bold text-tiny text-white/60 uppercase">
            Analytics Dashboard
          </p>
          <h4 className="font-medium text-white/90 text-xl">
            Unlock insights with real-time data
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Analytics dashboard background"
          className="z-0 h-full w-full rounded-none object-cover"
          src="https://images.pexels.com/photos/3030268/pexels-photo-3030268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <CardFooter className="absolute bottom-0 z-10 border-default-600 border-t-1 bg-black/40 dark:border-default-100">
          <div className="flex flex-grow items-center gap-2">
            <Image
              alt="Analytics app icon"
              className="h-11 w-10 rounded-full bg-black"
              src="https://heroui.com/images/breathing-app-icon.jpeg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Analytics Pro</p>
              <p className="text-tiny text-white/60">
                Monitor key metrics in real-time
              </p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Explore
          </Button>
        </CardFooter>
      </Card>
      <Carousel
        className="relative w-full overflow-hidden rounded-lg md:max-w-xs"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          <CarouselItem key={1}>
            <Card className="col-span-12 h-[300px] sm:col-span-4">
              <CardHeader className="!items-start absolute top-1 z-10 flex-col">
                <p className="font-bold text-tiny text-white/60 uppercase">
                  Team Collaboration
                </p>
                <h4 className="font-medium text-large text-white">
                  Streamline your workflow
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 h-full w-full object-cover"
                src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </Card>
          </CarouselItem>
          <CarouselItem key={2}>
            <Card className="col-span-12 h-[300px] sm:col-span-4">
              <CardHeader className="!items-start absolute top-1 z-10 flex-col">
                <p className="font-bold text-tiny text-white/60 uppercase">
                  API Integration
                </p>
                <h4 className="font-medium text-large text-white">
                  Connect with your favorite tools
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 h-full w-full object-cover"
                src="https://images.pexels.com/photos/3068920/pexels-photo-3068920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </Card>
          </CarouselItem>
          <CarouselItem key={3}>
            <Card className="col-span-12 h-[300px] sm:col-span-4">
              <CardHeader className="!items-start absolute top-1 z-10 flex-col">
                <p className="font-bold text-tiny text-white/60 uppercase">
                  Performance
                </p>
                <h4 className="font-medium text-large text-white">
                  Blazing fast and reliable service
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 h-full w-full object-cover"
                src="https://images.pexels.com/photos/29192451/pexels-photo-29192451/free-photo-of-street-mural-with-clocktower-in-cannes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </Card>
          </CarouselItem>
          <CarouselItem key={4}>
            <Card
              isFooterBlurred
              className="col-span-12 h-[300px] w-full sm:col-span-5"
            >
              <CardHeader className="absolute top-1 z-10 flex-col items-start">
                <p className="font-bold text-tiny text-white/60 uppercase">
                  New Feature
                </p>
                <h4 className="font-medium text-2xl text-white">
                  AI Assistant
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="-translate-y-6 z-0 h-full w-full scale-125 object-cover"
                src="https://images.pexels.com/photos/18503362/pexels-photo-18503362/free-photo-of-little-boy-looking-through-a-window.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <CardFooter className="absolute bottom-0 z-10 justify-between border-zinc-100/50 border-t-1 bg-white/30">
                <div>
                  <p className="text-black text-tiny">Coming next month</p>
                  <p className="text-black text-tiny">Join the waitlist</p>
                </div>
                <Button
                  className="text-tiny"
                  color="primary"
                  radius="full"
                  size="sm"
                >
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
          </CarouselItem>

          <CarouselItem key={5}>
            <Card
              isFooterBlurred
              className="col-span-12 h-[300px] w-full sm:col-span-7"
            >
              <CardHeader className="absolute top-1 z-10 flex-col items-start">
                <p className="font-bold text-tiny text-white/60 uppercase">
                  Customer Success
                </p>
                <h4 className="font-medium text-white/90 text-xl">
                  24/7 Support for your business needs
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 h-full w-full object-cover"
                src="https://images.pexels.com/photos/24713134/pexels-photo-24713134/free-photo-of-entrance-to-a-photo-camera-shop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <CardFooter className="absolute bottom-0 z-10 border-default-600 border-t-1 bg-black/40 dark:border-default-100">
                <div className="flex flex-grow items-center gap-2">
                  <Image
                    alt="Support team icon"
                    className="h-11 w-10 rounded-full bg-black"
                    src="https://heroui.com/images/breathing-app-icon.jpeg"
                  />
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">Support Hub</p>
                    <p className="text-tiny text-white/60">
                      Get help when you need it.
                    </p>
                  </div>
                </div>
                <Button radius="full" size="sm">
                  Contact
                </Button>
              </CardFooter>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <div className="-translate-y-1/2 absolute top-8 right-12 flex gap-2">
          <CarouselPrevious className="-left-4 h-8 w-8 text-white" />
          <CarouselNext className="h-8 w-8 text-white" />
        </div>
      </Carousel>
    </div>
  );
}
