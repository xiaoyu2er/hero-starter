import type { NavbarProps } from '@heroui/react';

import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  cn,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Link as RouterLink } from '@tanstack/react-router';
import { ModeToggle } from '~/components/mode-toggle';
import { querySessionOptions } from '~/lib/queries/auth';
import {
  AcmeIcon,
  ActivityIcon,
  ChevronDownIcon,
  FlashIcon,
  LockIcon,
  ScaleIcon,
  ServerIcon,
  TagUserIcon,
} from './icons/social';
import { Link } from './link';

const menuItems = [
  'About',
  'Blog',
  'Customers',
  'Pricing',
  'Enterprise',
  'Changelog',
  'Documentation',
  'Contact Us',
];

const BasicNavbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ classNames = {}, ...props }, ref) => {
    const { data, isLoading } = useQuery(querySessionOptions);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const icons = {
      chevron: <ChevronDownIcon fill="currentColor" size={16} />,
      scale: (
        <ScaleIcon className="text-warning" fill="currentColor" size={30} />
      ),
      lock: <LockIcon className="text-success" fill="currentColor" size={30} />,
      activity: (
        <ActivityIcon
          className="text-secondary"
          fill="currentColor"
          size={30}
        />
      ),
      flash: (
        <FlashIcon className="text-primary" fill="currentColor" size={30} />
      ),
      server: (
        <ServerIcon className="text-success" fill="currentColor" size={30} />
      ),
      user: (
        <TagUserIcon className="text-danger" fill="currentColor" size={30} />
      ),
    };

    return (
      <Navbar
        ref={ref}
        {...props}
        classNames={{
          base: cn('border-default-100 bg-transparent', {
            'bg-default-200/50 dark:bg-default-100/50': isMenuOpen,
          }),
          wrapper: 'w-full justify-center',
          item: 'hidden md:flex',
          ...classNames,
        }}
        height="60px"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Left Content */}
        <NavbarBrand>
          <div className="rounded-full bg-default-foreground text-background">
            <Link to="/">
              <AcmeIcon size={34} />
            </Link>
          </div>
        </NavbarBrand>

        {/* Center Content */}
        <NavbarContent justify="center">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                >
                  Features
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              itemClasses={{
                base: 'gap-4',
              }}
            >
              <DropdownItem
                key="autoscaling"
                description="ACME scales apps based on demand and load"
                startContent={icons.scale}
              >
                Autoscaling
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Real-time metrics to debug issues"
                startContent={icons.activity}
              >
                Usage Metrics
              </DropdownItem>
              <DropdownItem
                key="production_ready"
                description="ACME runs on ACME, join us at web scale"
                startContent={icons.flash}
              >
                Production Ready
              </DropdownItem>
              <DropdownItem
                key="99_uptime"
                description="High availability and uptime guarantees"
                startContent={icons.server}
              >
                +99% Uptime
              </DropdownItem>
              <DropdownItem
                key="supreme_support"
                description="Support team ready to respond"
                startContent={icons.user}
              >
                +Supreme Support
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem>
            <Link
              className="text-default-500"
              to="/docs"
              size="sm"
              activeProps={{
                className: 'font-bold text-default-foregound',
              }}
            >
              Docs
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-default-500"
              to="/pricing"
              size="sm"
              activeProps={{
                className: 'font-bold text-default-foregound',
              }}
            >
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-default-500"
              to="/about-us"
              size="sm"
              activeProps={{
                className: 'font-bold text-default-foregound',
              }}
            >
              About
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Right Content */}
        <NavbarContent className="hidden md:flex" justify="end">
          <NavbarItem className="!flex ml-2 items-center gap-2">
            {!isLoading && !data?.session && (
              <Button color="primary" size="sm" as={RouterLink} to="/login">
                Login
              </Button>
            )}
            {!isLoading && data?.session && (
              <Button
                color="primary"
                endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                variant="flat"
                size="sm"
                as={RouterLink}
                to="/dash"
              >
                Dashboard
              </Button>
            )}
            <ModeToggle />
          </NavbarItem>
        </NavbarContent>

        <ModeToggle className="md:hidden" />
        <NavbarMenuToggle className="text-default-400 md:hidden" />

        <NavbarMenu
          className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pt-6 pb-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
          motionProps={{
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: {
              ease: 'easeInOut',
              duration: 0.2,
            },
          }}
        >
          <NavbarMenuItem>
            <Button fullWidth as={Link} href="/#" variant="faded">
              Sign In
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem className="mb-4">
            <Button
              fullWidth
              as={Link}
              className="bg-foreground text-background"
              href="/#"
            >
              Get Started
            </Button>
          </NavbarMenuItem>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="mb-2 w-full text-default-500" href="#" size="md">
                {item}
              </Link>
              {index < menuItems.length - 1 && (
                <Divider className="opacity-50" />
              )}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
  }
);

BasicNavbar.displayName = 'BasicNavbar';

export default BasicNavbar;
