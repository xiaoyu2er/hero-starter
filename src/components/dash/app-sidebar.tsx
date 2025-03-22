import {
  Listbox,
  ListboxItem,
  ListboxSection,
  Tooltip,
  cn,
} from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { type ReactNode, useRouter } from '@tanstack/react-router';
import {
  ChartLineIcon,
  CheckCircleIcon,
  GiftIcon,
  HomeIcon,
  InfoIcon,
  LandmarkIcon,
  LogOutIcon,
  PanelLeftIcon,
  PieChartIcon,
  PlusIcon,
  SettingsIcon,
  SortAscIcon,
  Users2Icon,
} from 'lucide-react';
import { useSidebar } from '~/components/ui/sidebar';
import { authClient } from '~/lib/auth-client';

type SidebarItem = {
  key: string;
  href?: string;
  title: string;
  startIcon: ReactNode;
  endIcon?: ReactNode;
  label: string;
  tooltip?: string;
  onPress?: () => void;
};

type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

export function AppSidebar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toggleSidebar, state } = useSidebar();

  const isCollapsed = state === 'collapsed';

  const handleLogout = async () => {
    await authClient.signOut();
    queryClient.invalidateQueries({ queryKey: ['session'] });
    router.invalidate();
  };

  // Configuration for sidebar sections and items
  const sidebarConfig: SidebarSection[] = [
    {
      title: '', // Empty title for the toggle section
      items: [
        {
          key: 'toggle-sidebar',
          title: 'Toggle Sidebar',
          startIcon: (
            <PanelLeftIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          label: 'Dashboard',
          onPress: toggleSidebar,
          tooltip: 'Toggle Sidebar',
        },
      ],
    },
    {
      title: 'Your Teams',
      items: [
        {
          key: 'home',
          href: '#',
          title: 'Home',
          startIcon: (
            <HomeIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          label: 'Home',
        },
        {
          key: 'projects',
          href: '#',
          title: 'Projects',
          startIcon: (
            <ChartLineIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          endIcon: (
            <PlusIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          label: 'Projects',
        },
        {
          key: 'tasks',
          href: '#',
          title: 'Tasks',
          startIcon: (
            <CheckCircleIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          endIcon: (
            <PlusIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          label: 'Tasks',
        },
        {
          key: 'team',
          href: '#',
          title: 'Team',
          startIcon: (
            <Users2Icon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          label: 'Team',
        },
        {
          key: 'tracker',
          href: '#',
          title: 'Tracker',
          startIcon: (
            <SortAscIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          endIcon: (
            <PlusIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          label: 'Tracker',
        },
      ],
    },
    {
      title: 'Reports',
      items: [
        {
          key: 'cap_table',
          href: '#',
          title: 'Cap Table',
          startIcon: (
            <PieChartIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          label: 'Cap Table',
        },
        {
          key: 'analytics',
          href: '#',
          title: 'Analytics',
          startIcon: (
            <ChartLineIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          label: 'Analytics',
        },
        {
          key: 'perks',
          href: '/perks',
          title: 'Perks',
          startIcon: (
            <GiftIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          endIcon: (
            <PlusIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          label: 'Perks',
        },
        {
          key: 'expenses',
          href: '#',
          title: 'Expenses',
          startIcon: (
            <LandmarkIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          label: 'Expenses',
        },
        {
          key: 'settings',
          href: '/settings',
          title: 'Settings',
          startIcon: (
            <SettingsIcon
              size={20}
              strokeWidth={1.5}
              className="text-default-500"
            />
          ),
          label: 'Settings',
        },
      ],
    },
  ];

  // Configuration for footer items
  const footerConfig = [
    {
      key: 'help',
      title: 'Help & Information',
      startIcon: (
        <InfoIcon size={20} strokeWidth={1.5} className="text-default-500" />
      ),
      label: 'Help & Information',
      onPress: () => {}, // Add actual help handler if needed
    },
    {
      key: 'logout',
      title: 'Log Out',
      startIcon: (
        <LogOutIcon
          size={20}
          strokeWidth={1.5}
          className="rotate-180 text-default-500"
        />
      ),
      label: 'Log Out',
      onPress: handleLogout,
    },
  ];

  // Render a single ListboxItem
  const renderListboxItem = (item: SidebarItem, isCollapsed: boolean) => {
    // Normal item
    return (
      <ListboxItem
        key={item.key}
        // title={item.title}
        startContent={isCollapsed ? undefined : item.startIcon}
        endContent={isCollapsed ? undefined : item.endIcon}
        onPress={item.onPress}
        {...(item.href && { href: item.href })}
      >
        {isCollapsed ? (
          <Tooltip content={item.tooltip ?? item.label} placement="right">
            {item.startIcon}
          </Tooltip>
        ) : (
          item.label
        )}
      </ListboxItem>
    );
  };

  return (
    <div
      className={cn(
        'relative flex h-full flex-col p-2 transition-all duration-300',
        isCollapsed ? 'w-[60px] items-center' : 'w-64 max-w-[288px]'
      )}
    >
      {/* The Listbox with sections */}
      <Listbox
        aria-label="Sidebar Navigation"
        variant="flat"
        className="relative flex w-full list-none flex-col gap-1 overflow-clip p-1"
      >
        {/* Map through sidebar config to render sections and items */}
        {sidebarConfig.map((section, index) => (
          <ListboxSection
            key={`section-${index}`}
            title={isCollapsed ? '' : section.title}
            className={cn('mb-2 w-full', isCollapsed && 'max-w-[44px] p-0')}
          >
            {section.items.map((item) => renderListboxItem(item, isCollapsed))}
          </ListboxSection>
        ))}
      </Listbox>

      {/* Footer Actions */}
      <div className="mt-auto">
        <Listbox
          aria-label="Footer Actions"
          variant="flat"
          className={cn(
            'relative flex w-full list-none flex-col gap-1 overflow-clip p-1'
          )}
        >
          {footerConfig.map((item) => renderListboxItem(item, isCollapsed))}
        </Listbox>
      </div>
    </div>
  );
}
