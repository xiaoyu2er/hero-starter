import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';
import { auth } from '~/lib/auth';

export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const { headers } = getWebRequest()!;
    const session = await auth.api.getSession({ headers });
    return session;
  }
);
