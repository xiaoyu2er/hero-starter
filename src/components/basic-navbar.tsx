import type { NavbarProps } from '@heroui/react';

import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Divider,
  cn,
} from '@heroui/react';
import { Icon } from '@iconify/react';

import { AcmeIcon } from './icons/social';
import { ModeToggle } from '~/components/mode-toggle';
import { querySessionOptions } from '~/lib/queries/auth';
import { useQuery } from '@tanstack/react-query';
import { Link as RouterLink } from '@tanstack/react-router';

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
            <AcmeIcon size={34} />
          </div>
          <span className="ml-2 font-medium text-default-foreground text-small">
            {import.meta.env.VITE_APP_NAME}
          </span>
        </NavbarBrand>

        {/* Center Content */}
        <NavbarContent justify="center">
          <NavbarItem
            isActive
            className="data-[active='true']:font-medium[date-active='true']"
          >
            <Link
              aria-current="page"
              className="text-default-foreground"
              href="#"
              size="sm"
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-default-500" href="#" size="sm">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-default-500" href="#" size="sm">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-default-500" href="#" size="sm">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-default-500" href="#" size="sm">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Right Content */}
        <NavbarContent className="hidden md:flex" justify="end">
          <NavbarItem className="!flex ml-2 items-center gap-2">
            {!isLoading && !data?.session && (
              <Button
                color="primary"
                size="sm"
                as={RouterLink}
                to="/login"
              >
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
