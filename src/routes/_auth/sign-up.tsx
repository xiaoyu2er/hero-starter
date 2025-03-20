import { Button, Image, addToast } from '@heroui/react';
import { Form } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { DividerOr } from '~/components/auth/divider-or';
import { OauthButtons } from '~/components/auth/oauth-buttons';
import { useAppForm } from '~/components/forms';
import { Link } from '~/components/link';
import { authClient } from '~/lib/auth-client';
import { getMailLink } from '~/lib/email';
import { zSignUpSchema } from '~/lib/zod/auth';

export const Route = createFileRoute('/_auth/sign-up')({
  component: RouteComponent,
  validateSearch: (search) => {
    return search as { redirect?: string };
  },
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { redirect } = useSearch({ from: '/_auth/sign-up' });
  const [isRegistered, setIsRegistered] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      acceptTerms: false,
    },
    validators: {
      onSubmit: zSignUpSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signUp.email({
        ...value,
        callbackURL: redirect ?? '/dash',
      });

      if (error) {
        addToast({
          title: 'Error',
          description: error.message,
          color: 'danger',
          timeout: 3000,
        });
        return;
      }

      // Store the email to display in the verification screen
      setUserEmail(value.email);
      setIsRegistered(true);
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });

  // Email verification screen after successful registration
  if (isRegistered) {
    const mailLink = getMailLink(userEmail);
    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-large bg-content1 p-6 pb-10 shadow-small">
        <Image
          src="/new-msg.svg"
          alt="Email sent"
          className="w-full max-w-[180px] sm:max-w-[220px]"
        />

        <h1 className="font-medium text-lg sm:text-xl">
          Verify your email address
        </h1>

        <p className="text-default-500 text-sm">
          We've sent a verification email to <strong>{userEmail}</strong>
        </p>

        {mailLink && (
          <Button
            color="primary"
            className="w-full"
            as="a"
            href={mailLink}
            target="_blank"
            rel="noopener noreferrer"
            data-cy="open-inbox-link"
          >
            Go to your mail
          </Button>
        )}

        <p className="text-center text-default-500 text-xs sm:text-sm">
          Click the verification link to complete signup. You can safely close
          this tab.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 p-6 pb-10 shadow-small">
      <div className="flex flex-col gap-1">
        <h1 className="font-medium text-large">Sign up</h1>
        <p className="text-default-500 text-small">
          to continue to {import.meta.env.VITE_APP_NAME}
        </p>
      </div>
      <OauthButtons />
      <DividerOr />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-3"
      >
        <form.AppField
          name="name"
          children={(filed) => (
            <filed.InputField
              label="Name"
              type="text"
              isRequired
              placeholder="Enter your name"
            />
          )}
        />
        <form.AppField
          name="email"
          children={(filed) => (
            <filed.InputField
              label="Email"
              type="email"
              isRequired
              placeholder="Enter your email"
            />
          )}
        />
        <form.AppField
          name="password"
          children={(filed) => (
            <filed.PasswordField
              label="Password"
              isRequired
              placeholder="Enter your password"
            />
          )}
        />
        <form.AppField
          name="acceptTerms"
          children={(filed) => (
            <div className="flex items-center gap-1">
              <filed.CheckboxField size="sm" classNames={{ label: 'z-10' }}>
                I agree with the&nbsp;
                <Link
                  to="/legal/terms"
                  size="sm"
                  isExternal
                  color={
                    filed.state.meta.errors.length > 0 ? 'danger' : 'primary'
                  }
                  className="hover:underline"
                >
                  Terms
                </Link>
                &nbsp;and&nbsp;
                <Link
                  to="/legal/privacy"
                  size="sm"
                  isExternal
                  color={
                    filed.state.meta.errors.length > 0 ? 'danger' : 'primary'
                  }
                  className="hover:underline"
                >
                  Privacy Policy
                </Link>
              </filed.CheckboxField>
            </div>
          )}
        />
        <form.AppForm>
          <form.SubmitButton className="w-full" color="primary">
            Sign Up
          </form.SubmitButton>
        </form.AppForm>
      </Form>
      <p className="text-center text-small">
        Already have an account?&nbsp;
        <Link to="/login" size="sm">
          Sign In
        </Link>
      </p>
    </div>
  );
}
