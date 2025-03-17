import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { addToast, Checkbox } from '@heroui/react';
import { authClient } from '~/lib/auth-client';
import { useAppForm } from '~/components/forms';
import { zLoginSchema } from '~/lib/zod/auth';
import { Link, Form } from '@heroui/react';
import { DividerOr } from '~/components/auth/divider-or';
import { OauthButtons } from '~/components/auth/oauth-buttons';
import { useQueryClient } from '@tanstack/react-query';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: zLoginSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
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
      addToast({
        title: 'Success',
        description: 'Login successful',
        color: 'success',
        timeout: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ['session'] });
      navigate({ to: '/dash' });
    },
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pt-6 pb-10 shadow-small">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-large">Sign in</h1>
          <p className="text-default-500 text-small">to continue to Acme</p>
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
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <form.AppForm>
            <form.SubmitButton className="w-full" color="primary">
              Sign In
            </form.SubmitButton>
          </form.AppForm>
        </Form>
      </div>
    </div>
  );
}
