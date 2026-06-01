import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import { authenticator } from '../auth.server'
import { destroySession, getSession } from '../session.server'

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  return redirect(
    `https://${process.env.AUTHACTION_TENANT_DOMAIN}/oidc/logout?post_logout_redirect_uri=${process.env.AUTHACTION_LOGOUT_REDIRECT_URI}`,
    { headers: { 'Set-Cookie': await destroySession(session) } }
  )
}
