import { Link } from '@heroui/react';
import type { FC } from 'react';

export const TermsPrivacy: FC = () => {
  return (
    <p className="px-8 text-center text-muted-foreground text-sm">
      By clicking continue, you agree to our{' '}
      <Link isExternal size="sm" href={'/legal/terms'}>
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link isExternal size="sm" href={'/legal/privacy'}>
        Privacy Policy
      </Link>
    </p>
  );
};
