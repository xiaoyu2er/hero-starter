import { createFileRoute, } from '@tanstack/react-router';
import { addToast, Button } from '@heroui/react';
import { authClient } from '~/lib/auth-client';
import { useAppForm } from '~/components/forms';
import { zSignUpSchema } from '~/lib/zod/auth';
import { Form } from '@heroui/react';
import { DividerOr } from '~/components/auth/divider-or';
import { OauthButtons } from '~/components/auth/oauth-buttons';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from '~/components/Link';
import { useState } from 'react';

export const Route = createFileRoute('/_auth/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
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
        callbackURL: '/dash',
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
            <h1 className="font-medium text-xl">Almost Done!</h1>
            <p className="mt-2 text-default-500">
              We've sent a verification email to <strong>{userEmail}</strong>
            </p>
          </div>

          <div className="mb-4 rounded-lg bg-default-50 p-4">
            <h2 className="mb-2 font-medium">Next steps:</h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Check your email inbox (and spam folder)</li>
              <li>Click the verification link in the email</li>
              <li>You'll be automatically signed in after verification</li>
            </ol>
          </div>

          <p className="mb-4 text-center text-default-500 text-small">
            Didn't receive the email? Check your spam folder or try again in a
            few minutes.
          </p>

          <div className="flex flex-col gap-2">
            <Button color="primary" className="w-full" as={Link} to="/login">
              Go to Login Page
            </Button>
            <Button
              variant="flat"
              color="default"
              className="w-full"
              onPress={() => setIsRegistered(false)}
            >
              Back to Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
