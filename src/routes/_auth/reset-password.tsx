import { addToast, Button, Form } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { useAppForm } from '~/components/forms';
import { Link } from '~/components/Link';
import { authClient } from '~/lib/auth-client';
import {
  zResetPasswordSchema,
  zResetPasswordSearchSchema,
} from '~/lib/zod/auth';

export const Route = createFileRoute('/_auth/reset-password')({
  component: RouteComponent,
  validateSearch: zodValidator(zResetPasswordSearchSchema),
});

function RouteComponent() {
  const { token, error } = useSearch({ from: '/_auth/reset-password' });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (error || !token) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pt-6 pb-10 shadow-small">
          <div className="mb-4 flex flex-col items-center gap-1 text-center">
            <div className="mb-4 text-danger">
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
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h1 className="font-medium text-xl">Invalid Reset Link</h1>
            <p className="mt-2 text-default-500">
              The password reset link is invalid or has expired.
            </p>
          </div>

          <div className="mb-4 rounded-lg bg-default-50 p-4">
            <p>Please request a new password reset link to continue.</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="w-full" color="primary" as={Link} to="/login">
              Back to Login
            </Button>
            <Button
              className="w-full"
              variant="flat"
              color="default"
              as={Link}
              to="/forgot-password"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const form = useAppForm({
    defaultValues: {
      newPassword: '',
    },
    validators: {
      onSubmit: zResetPasswordSchema.pick({ newPassword: true }),
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.resetPassword({ ...value, token });
      console.log('~error', error);
      if (error) {
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
        description: 'Password reset successful, please login to continue.',
        color: 'success',
        timeout: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ['session'] });
      navigate({ to: '/login' });
    },
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pt-6 pb-10 shadow-small">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-large">Reset Password</h1>
          <p className="text-default-500 text-small">
            Enter your new password to reset your account.
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
            name="newPassword"
            children={(filed) => (
              <filed.InputField
                label="New Password"
                type="password"
                isRequired
                placeholder="Enter your new password"
              />
            )}
          />

          <form.AppForm>
            <form.SubmitButton className="w-full" color="primary">
              Reset Password
            </form.SubmitButton>
          </form.AppForm>
        </Form>
      </div>
    </div>
  );
}
