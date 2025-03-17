import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { addToast } from '@heroui/react';
import { authClient } from '~/lib/auth-client';
import { useAppForm } from '~/components/forms';
import { zSignUpSchema } from '~/lib/zod/auth';
import { Form } from '@heroui/react';
import { DividerOr } from '~/components/auth/divider-or';
import { OauthButtons } from '~/components/auth/oauth-buttons';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from '~/components/Link';

export const Route = createFileRoute('/_auth/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      const { error } = await authClient.signUp.email(value);

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
        description: 'Sign up successful, please verify your email',
        color: 'success',
        timeout: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ['session'] });
      // navigate({ to: '/dash' });
    },
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pt-6 pb-10 shadow-small">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-large">Sign up</h1>
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
                  &nbsp; and&nbsp;
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
    </div>
  );
}
