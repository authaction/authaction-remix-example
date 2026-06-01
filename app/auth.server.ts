import { Authenticator } from 'remix-auth'
import { OAuth2Strategy } from 'remix-auth-oauth2'
import { sessionStorage } from './session.server'

export interface User {
  sub: string
  name: string
  email: string
  picture?: string
  accessToken: string
}

export const authenticator = new Authenticator<User>(sessionStorage)

authenticator.use(
  new OAuth2Strategy(
    {
      clientId: process.env.AUTHACTION_CLIENT_ID!,
      clientSecret: process.env.AUTHACTION_CLIENT_SECRET!,
      authorizationEndpoint: `https://${process.env.AUTHACTION_TENANT_DOMAIN}/oauth2/authorize`,
      tokenEndpoint: `https://${process.env.AUTHACTION_TENANT_DOMAIN}/oauth2/token`,
      redirectURI: process.env.AUTHACTION_REDIRECT_URI!,
      scopes: ['openid', 'profile', 'email'],
    },
    async ({ tokens }) => {
      const accessToken = tokens.accessToken()

      const userinfo = await fetch(
        `https://${process.env.AUTHACTION_TENANT_DOMAIN}/oauth2/userinfo`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ).then((r) => r.json())

      return { ...userinfo, accessToken }
    }
  ),
  'authaction'
)
