import type { FC } from 'react';
import { Link } from '~/components/link';

export const TermsPrivacy: FC = () => {
  return (
    <p className="px-8 text-center text-muted-foreground text-sm">
      By clicking continue, you agree to our{' '}
      <Link isExternal size="sm" to={'/legal/terms'}>
        Terms
      </Link>{' '}
      and{' '}
      <Link isExternal size="sm" to={'/legal/privacy'}>
        Privacy Policy
      </Link>
    </p>
  );
};
