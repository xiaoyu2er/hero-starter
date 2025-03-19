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
      <div className="flex h-full w-full items-center justify-center p-4">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-large bg-content1 px-5 py-5 text-center shadow-small sm:max-w-md sm:px-8">
          <img
            src="/400.svg"
            alt="Invalid link"
            className="w-full max-w-[180px] sm:max-w-[220px]"
          />

          <h1 className="font-medium text-lg sm:text-xl">
            Invalid reset link
          </h1>

          <p className="text-default-500 text-sm">
            The password reset link is invalid or has expired.
            Please request a new password reset link to continue.
          </p>

          <div className="flex w-full gap-2">
            <Button
              className="flex-1"
              variant="flat"
              color="default"
              as={Link}
              to="/forgot-password"
            >
              Try Again
            </Button>
            <Button
              className="flex-1"
              color="primary"
              as={Link}
              to="/login"
            >
              Back to Login
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
