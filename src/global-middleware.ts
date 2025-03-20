import { registerGlobalMiddleware } from '@tanstack/react-start';
import { logMiddleware } from './server/logging-middleware';

registerGlobalMiddleware({
  middleware: [logMiddleware],
});
