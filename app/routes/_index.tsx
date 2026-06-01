import { type LoaderFunctionArgs } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '../auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request)
  return { user }
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <Form action="/auth/logout" method="post">
            <button type="submit">Logout</button>
          </Form>
        </div>
      ) : (
        <div>
          <h1>AuthAction Remix Example</h1>
          <Form action="/auth/login" method="post">
            <button type="submit">Login with AuthAction</button>
          </Form>
        </div>
      )}
    </div>
  )
}
