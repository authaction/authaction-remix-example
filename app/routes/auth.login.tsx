import { type ActionFunctionArgs } from '@remix-run/node'
import { authenticator } from '../auth.server'

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate('authaction', request)
}
