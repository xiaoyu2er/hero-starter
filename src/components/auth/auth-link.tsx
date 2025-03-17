import { Link, cn } from '@heroui/react';
import type { FC, ReactNode } from 'react';

export type AuthLinkProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  onPress?: () => void;
  withSearchParams?: boolean;
};

export const AuthLink: FC<AuthLinkProps> = ({
  href,
  children,
  className,
  onPress,
}) => {
  return (
    <Link
      href={href}
      underline="hover"
      size="sm"
      className={cn('font-medium text-xs', className)}
      // TODO: onPress will prevent the default behavior of the link
      onClick={onPress}
    >
      {children}
    </Link>
  );
};
