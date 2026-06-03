import { type LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { auth } from '../auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.requireSession(request)
  return { user: session.user }
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <Form action="/auth/logout" method="post">
        <button type="submit">Logout</button>
      </Form>
    </div>
  )
}
