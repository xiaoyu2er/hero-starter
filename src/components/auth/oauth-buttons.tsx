import { Button, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { authClient } from '~/lib/auth-client';

export const OauthGithubButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      startContent={
        isLoading ? null : (
          <Icon className="text-default-500" icon="fe:github" width={24} />
        )
      }
      variant="bordered"
      as={Link}
      onPress={async () => {
        setIsLoading(true);
        await authClient.signIn.social({
          provider: 'github',
          callbackURL: '/dash',
        });
        setIsLoading(false);
      }}
      isLoading={isLoading}
    >
      Continue with Github
    </Button>
  );
};

export const OauthGoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      startContent={
        isLoading ? null : (
          <Icon
            className="text-default-500"
            icon="flat-color-icons:google"
            width={24}
          />
        )
      }
      variant="bordered"
      as={Link}
      onPress={async () => {
        setIsLoading(true);
        await authClient.signIn.social({
          provider: 'google',
          callbackURL: '/dash',
        });
        setIsLoading(false);
      }}
      isLoading={isLoading}
    >
      Continue with Google
    </Button>
  );
};

export function OauthButtons() {
  return (
    <div className="flex flex-col gap-2">
      <OauthGithubButton />
      <OauthGoogleButton />
    </div>
  );
}
