import { type LoaderFunctionArgs } from '@remix-run/node'
import { auth } from '../auth.server'

export function loader({ request }: LoaderFunctionArgs) {
  return auth.handleLogin(request)
}
