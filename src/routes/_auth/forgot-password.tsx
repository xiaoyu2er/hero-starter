import { Button, Image, addToast } from '@heroui/react';
import { Form } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useAppForm } from '~/components/forms';
import { Link } from '~/components/link';
import { authClient } from '~/lib/auth-client';
import { getMailLink } from '~/lib/email';
import { zForgotPasswordSchema } from '~/lib/zod/auth';

export const Route = createFileRoute('/_auth/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const form = useAppForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: zForgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.forgetPassword({
        ...value,
        redirectTo: '/reset-password',
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

      // Store email and set state to show confirmation screen
      setUserEmail(value.email);
      setIsResetLinkSent(true);

      addToast({
        title: 'Success',
        description: 'Password reset link sent',
        color: 'success',
        timeout: 3000,
      });
    },
  });

  // Password reset confirmation screen
  if (isResetLinkSent) {
    const mailLink = getMailLink(userEmail);

    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-large bg-content1 p-6 pb-10 shadow-small">
        <Image
          src="/new-msg.svg"
          alt="Email sent"
          className="w-full max-w-[180px] sm:max-w-[220px]"
        />

        <h1 className="font-medium text-lg sm:text-xl">Reset link sent</h1>

        <p className="text-default-500 text-sm">
          We've sent a password reset link to <strong>{userEmail}</strong>
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
          Click the reset link to create a new password. You can safely close
          this tab.
        </p>
      </div>
    );
  }

  // Password reset request form
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 p-6 pb-10 shadow-small">
      <div className="flex flex-col gap-1">
        <h1 className="font-medium text-large">Forgot Password</h1>
        <p className="text-default-500 text-small">
          Enter your email to receive a password reset link
        </p>
      </div>

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

        <form.AppForm>
          <form.SubmitButton className="w-full" color="primary">
            Send Reset Link
          </form.SubmitButton>
        </form.AppForm>
      </Form>

      <p className="text-center text-small">
        Remember your password?&nbsp;
        <Link to="/login" size="sm">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
