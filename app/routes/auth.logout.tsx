import { type ActionFunctionArgs } from '@remix-run/node'
import { auth } from '../auth.server'

export function action({ request }: ActionFunctionArgs) {
  return auth.handleLogout(request)
}
