import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router';
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

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
  validateSearch: (search) => {
    console.log('~search', search);
    return search as { redirect?: string };
  },
});

function RouteComponent() {
  const router = useRouter();
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
      const { error } = await authClient.signIn.email(value);
      console.log('~error', error);
      if (error) {
        if (error.code === 'EMAIL_NOT_VERIFIED') {
          setUserEmail(value.email);

          // Automatically send verification email when EMAIL_NOT_VERIFIED is detected
          const verificationResult = await authClient.sendVerificationEmail({
            email: value.email,
            callbackURL: redirect ?? '/dash',
          });

          if (verificationResult.error) {
            addToast({
              title: 'Error',
              description: verificationResult.error.message,
              color: 'danger',
              timeout: 3000,
            });
          } else {
            // Show verification sent UI
            setIsEmailNotVerified(true);
          }
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
            <h1 className="font-medium text-xl">Verification Required</h1>
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
            <Button
              color="primary"
              className="w-full"
              onPress={() => setIsEmailNotVerified(false)}
            >
              Back to Login
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
