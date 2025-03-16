import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Form,
} from '@heroui/react';
import { authClient } from '~/lib/auth-client';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: '/dash',
      });
      navigate({ to: '/' });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to login. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1">
          <h2 className="font-bold text-2xl">Login</h2>
          <p className="text-default-500">Enter your credentials to continue</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <Form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              variant="bordered"
              isRequired
              onValueChange={setEmail}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              variant="bordered"
              isRequired
              onValueChange={setPassword}
            />
            {error && <div className="mt-2 text-danger text-sm">{error}</div>}
          </Form>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <Button
            className="w-full"
            color="primary"
            isDisabled={isLoading || !email || !password}
            isLoading={isLoading}
            onClick={handleLogin}
            type="submit"
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
