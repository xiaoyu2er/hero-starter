import type React from 'react';
import { useState, forwardRef } from 'react';
import {
  Badge,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Tabs,
  Tab,
} from '@heroui/react';
import { BellIcon, MailCheckIcon } from 'lucide-react';

// Define notification type
export type NotificationType =
  | 'request'
  | 'follow'
  | 'mention'
  | 'like'
  | 'comment'
  | 'message';

// Define notification item structure
export interface NotificationItem {
  id: string;
  type: NotificationType;
  avatar: string;
  name: string;
  message: string;
  time: string;
  read: boolean;
  actions?: React.ReactNode;
}

// Notification Item Component
export function NotificationItem({
  notification,
}: { notification: NotificationItem }) {
  return (
    <div
      className={`flex gap-3 border-divider border-b px-6 py-4 ${notification.read ? '' : 'bg-primary-50/50'}`}
    >
      <div className="relative flex-none">
        {notification.read ? (
          <Avatar radius="full" size="md" src={notification.avatar} />
        ) : (
          <Badge content="" color="primary" placement="bottom-right">
            <Avatar radius="full" size="md" src={notification.avatar} />
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-foreground text-small">
          <strong className="font-medium">{notification.name}</strong>{' '}
          {notification.message}
        </p>
        <time className="text-default-400 text-tiny">{notification.time}</time>
        {notification.actions && (
          <div className="flex gap-2 pt-2">{notification.actions}</div>
        )}
      </div>
    </div>
  );
}

// Create a reusable EmptyState component
export function EmptyNotificationState({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 py-10">
      <MailCheckIcon className="text-default-400" size={40} strokeWidth={1.5} />
      <p className="text-default-400 text-small">{message}</p>
    </div>
  );
}

// Sample notification data
const defaultNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'request',
    // https://api.dicebear.com/9.x/micah/svg?seed=1
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026723b',
    name: 'Alex Rivera',
    message: 'requested access to the Design System project.',
    time: '2 hours ago',
    read: false,
    actions: (
      <>
        <Button color="primary" size="sm" radius="sm">
          Accept
        </Button>
        <Button variant="flat" size="sm" radius="sm">
          Decline
        </Button>
      </>
    ),
  },
  {
    id: '2',
    type: 'follow',
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826745f',
    name: 'Sophia Chen',
    message: 'started following your design portfolio.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '3',
    type: 'message',
    avatar: 'https://i.pravatar.cc/150?u=a04258a24a2d826891d',
    name: 'Marcus Johnson',
    message:
      'sent you a message: "Hi there! The latest mockups look great, but could we discuss the color palette?"',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '4',
    type: 'mention',
    avatar: 'https://i.pravatar.cc/150?u=a04258a24a2d737612d',
    name: 'Priya Patel',
    message: 'mentioned you in a comment on the marketing strategy document.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'like',
    avatar: 'https://i.pravatar.cc/150?u=a04258a24a2d654312e',
    name: 'David Kim',
    message: 'liked your presentation on UX research findings.',
    time: '3 hours ago',
    read: false,
  },
  {
    id: '6',
    type: 'comment',
    avatar: 'https://i.pravatar.cc/150?u=a04258a24a2d826865f',
    name: 'Olivia Rodriguez',
    message: 'commented on your recent blog post about design trends.',
    time: '5 hours ago',
    read: true,
  },
];

export function useNotifications() {
  // Create notification arrays
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(defaultNotifications);

  // Filter for unread notifications
  const unreadNotifications = notifications.filter((n) => !n.read);

  // Initialize empty archived notifications
  const [archivedNotifications, setArchivedNotifications] = useState<
    NotificationItem[]
  >([]);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const archiveNotification = (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setArchivedNotifications((prev) => [...prev, notification]);
    }
  };

  return {
    notifications,
    unreadNotifications,
    archivedNotifications,
    setNotifications,
    setArchivedNotifications,
    markAllAsRead,
    archiveNotification,
  };
}

// Create a NotificationTrigger component that properly forwards refs
export const NotificationTrigger = forwardRef<
  HTMLButtonElement,
  {
    count?: number;
  } & React.ComponentProps<typeof Button>
>(({ count, ...props }, ref) => {
  const showBadge = count !== undefined && count > 0;

  return (
    <Badge
      content={showBadge ? count.toString() : undefined}
      color="danger"
      placement="top-right"
      shape="circle"
    >
      <Button
        ref={ref}
        isIconOnly
        variant="light"
        radius="full"
        aria-label="Notifications"
        {...props}
      >
        <BellIcon className="h-4 w-4 text-default-500" />
      </Button>
    </Badge>
  );
});
NotificationTrigger.displayName = 'NotificationTrigger';

export function NotificationPopover() {
  const {
    notifications,
    unreadNotifications,
    archivedNotifications,
    markAllAsRead,
  } = useNotifications();

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <NotificationTrigger count={unreadNotifications.length} />
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0">
        <Card className="border-none shadow-none">
          <CardHeader className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-1">
              <h4 className="font-medium text-large">Notifications</h4>
              <div className="inline-flex items-center gap-1 rounded-full bg-default/40 px-1 text-default-700 text-tiny">
                <span>{notifications.length}</span>
              </div>
            </div>
            <Button
              color="primary"
              variant="light"
              size="sm"
              radius="full"
              onPress={markAllAsRead}
            >
              Mark all as read
            </Button>
          </CardHeader>
          <CardBody className="flex w-[380px] flex-col items-center p-0">
            <Tabs
              aria-label="Notifications"
              classNames={{
                tabList: 'gap-6 px-6 py-0',
                panel: 'px-0 py-0 border-none',
              }}
              variant="underlined"
            >
              <Tab
                key="all"
                title={
                  <div className="flex items-center space-x-2">
                    <span>All</span>
                    <div className="inline-flex h-5 min-h-5 w-5 min-w-5 items-center justify-center rounded-full bg-default/40 text-default-700 text-tiny">
                      <span>{notifications.length}</span>
                    </div>
                  </div>
                }
              >
                <div className="max-h-[500px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <EmptyNotificationState message="No notifications yet." />
                  )}
                </div>
              </Tab>
              <Tab
                key="unread"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Unread</span>
                    <div className="inline-flex h-5 min-h-5 w-5 min-w-5 items-center justify-center rounded-full bg-default/40 text-default-700 text-tiny">
                      <span>{unreadNotifications.length}</span>
                    </div>
                  </div>
                }
              >
                <div className="max-h-[500px] overflow-y-auto">
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <EmptyNotificationState message="No unread notifications." />
                  )}
                </div>
              </Tab>
              <Tab key="archive" title="Archive">
                <div className="max-h-[500px] overflow-y-auto">
                  {archivedNotifications.length > 0 ? (
                    archivedNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <EmptyNotificationState message="No archived notifications." />
                  )}
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
