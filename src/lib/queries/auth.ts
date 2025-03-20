import { queryOptions } from '@tanstack/react-query';
import { getSession } from '~/server/auth';

export const querySessionOptions = queryOptions({
  queryKey: ['session'],
  queryFn: () => getSession(),
});
