import { cn } from '@heroui/react';
import type {} from 'react';
import { Link } from '~/components/link';
import type { LinkType } from '~/components/link';

export const AuthLink: LinkType = ({ to, children, className, onPress }) => {
  return (
    // @ts-ignore
    <Link
      to={to}
      underline="hover"
      color="foreground"
      size="sm"
      className={cn('font-medium text-xs', className)}
      // TODO: onPress will prevent the default behavior of the link
      onClick={onPress}
    >
      {children}
    </Link>
  );
};
