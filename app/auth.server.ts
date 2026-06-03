import { createRemixAuth } from '@authaction/server-sdk/remix';

export const auth = createRemixAuth({
  domain: process.env.AUTHACTION_DOMAIN!,
  clientId: process.env.AUTHACTION_CLIENT_ID!,
  clientSecret: process.env.AUTHACTION_CLIENT_SECRET,
  redirectUri: process.env.AUTHACTION_REDIRECT_URI!,
  sessionSecret: process.env.SESSION_SECRET!,
});
