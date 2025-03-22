import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { AcmeIcon } from '~/components/icons/social';
import { ModeToggle } from '~/components/mode-toggle';
import { authClient } from '~/lib/auth-client';
import { querySessionOptions } from '~/lib/queries/auth';
import { NotificationPopover } from './app-notification';

export function AppHeader() {
  const { data } = useSuspenseQuery(querySessionOptions);
  const router = useRouter();
  const queryClient = useQueryClient();
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
              <p className="font-semibold">{data?.user.name}</p>
              <p className="text-default-400 text-small">{data?.user.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onPress={async () => {
                await authClient.signOut();
                queryClient.invalidateQueries({ queryKey: ['session'] });
                router.invalidate();
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
