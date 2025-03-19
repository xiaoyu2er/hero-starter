import { createFileRoute, useSearch } from '@tanstack/react-router';
import { addToast } from '@heroui/react';
import { authClient } from '~/lib/auth-client';
import { useAppForm } from '~/components/forms';
import { zLoginSchema } from '~/lib/zod/auth';
import { Form } from '@heroui/react';
import { DividerOr } from '~/components/auth/divider-or';
import { OauthButtons } from '~/components/auth/oauth-buttons';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from '~/components/Link';
import { useState } from 'react';
import { Button } from '@heroui/react';
import { getMailLink } from '~/lib/email';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
  validateSearch: (search) => {
    console.log('~search', search);
    return search as { redirect?: string };
  },
});

function RouteComponent() {
  const { redirect } = useSearch({ from: '/_auth/login' });
  const queryClient = useQueryClient();
  const [isEmailNotVerified, setIsEmailNotVerified] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validators: {
      onSubmit: zLoginSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        ...value,
        callbackURL: redirect ?? '/dash',
      });

      if (error) {
        if (error.code === 'EMAIL_NOT_VERIFIED') {
          setUserEmail(value.email);
          setIsEmailNotVerified(true);

          return;
        }

        addToast({
          title: 'Error',
          description: error.message,
          color: 'danger',
          timeout: 3000,
        });
        return;
      }
      addToast({
        title: 'Success',
        description: 'Login successful',
        color: 'success',
        timeout: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });

  // Email verification screen (shown after automatically sending verification email)
  if (isEmailNotVerified) {
    const mailLink = getMailLink(userEmail);

    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-large bg-content1 px-5 py-5 text-center shadow-small sm:max-w-md sm:px-8">
          <img
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

          <p className="text-default-500 text-xs sm:text-sm">
            Click the verification link to complete signup. You can safely close
            this tab.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pt-6 pb-10 shadow-small">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-large">Sign in</h1>
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
          <div className="flex w-full items-center justify-between px-1 py-2">
            <form.AppField
              name="rememberMe"
              children={(filed) => (
                <filed.CheckboxField>Remember me</filed.CheckboxField>
              )}
            />
            <Link className="text-default-500" to="/forgot-password" size="sm">
              Forgot password?
            </Link>
          </div>
          <form.AppForm>
            <form.SubmitButton className="w-full" color="primary">
              Sign In
            </form.SubmitButton>
          </form.AppForm>
        </Form>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link to="/sign-up" search={{ redirect }} size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
