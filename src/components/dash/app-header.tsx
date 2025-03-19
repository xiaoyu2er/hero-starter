import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@heroui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { querySessionOptions } from '~/lib/queries/auth';
import { AcmeIcon } from '~/components/icons/social';
import { NotificationPopover } from './app-notification';
import { ModeToggle } from '~/components/mode-toggle';

export function AppHeader() {
  const { data } = useSuspenseQuery(querySessionOptions);

  return (
    <Navbar
      classNames={{
        wrapper: '!max-w-none',
      }}
    >
      <NavbarBrand>
        <AcmeIcon />
        <p className="font-bold text-inherit">
          {import.meta.env.VITE_APP_NAME}
        </p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <div className="hidden gap-4 sm:flex">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link aria-current="page" color="secondary" href="#">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </div>

        <div>
          <ModeToggle />
          <NotificationPopover />
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={data?.user.name}
              size="sm"
              src={data?.user.image ?? undefined}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{data?.user.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
