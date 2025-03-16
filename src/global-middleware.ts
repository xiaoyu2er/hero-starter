import { registerGlobalMiddleware } from "@tanstack/react-start";
import { logMiddleware } from "./server/loggingMiddleware";

registerGlobalMiddleware({
  middleware: [logMiddleware],
});
