import { createFileRoute } from '@tanstack/react-router';
import { addToast, Button } from '@heroui/react';
import { authClient } from '~/lib/auth-client';
import { useAppForm } from '~/components/forms';
import { Form } from '@heroui/react';
import { useState } from 'react';
import { Link } from '~/components/Link';
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
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-large bg-content1 px-8 pt-6 pb-10 shadow-small">
          <div className="mb-4 flex flex-col items-center gap-1 text-center">
            <div className="mb-4 text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h1 className="font-medium text-xl">Reset Link Sent!</h1>
            <p className="mt-2 text-default-500">
              We've sent a password reset link to <strong>{userEmail}</strong>
            </p>
          </div>

          <div className="mb-4 rounded-lg bg-default-50 p-4">
            <h2 className="mb-2 font-medium">Next steps:</h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Check your email inbox (and spam folder)</li>
              <li>Click the password reset link in the email</li>
              <li>Create your new password on the page that opens</li>
            </ol>
          </div>

          <p className="mb-4 text-center text-default-500 text-small">
            Didn't receive the email? Check your spam folder or try again in a
            few minutes.
          </p>

          <div className="flex flex-col gap-2">
            <Button color="primary" className="w-full" as={Link} to="/login">
              Back to Login
            </Button>
            <Button
              variant="flat"
              color="default"
              className="w-full"
              onPress={() => setIsResetLinkSent(false)}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Password reset request form
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pt-6 pb-10 shadow-small">
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
    </div>
  );
}
