# authaction-remix-example

A Remix application demonstrating OAuth2 authentication using [AuthAction](https://app.authaction.com/) with `@authaction/server-sdk`.

## Overview

This application shows how to configure and handle authentication using AuthAction's OAuth2 service in a Remix application. The setup includes:

- OAuth2 login flow using `@authaction/server-sdk/remix` with AuthAction as the OIDC provider
- Secure server-side session management with encrypted cookies
- Protected routes using loader-based auth checks
- Logout with AuthAction's OIDC logout flow

## Prerequisites

- **Node.js 18+**
- **AuthAction credentials**: `domain`, `clientId`, `clientSecret`, and configured redirect URIs.

## Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:authaction/authaction-remix-example.git
   cd authaction-remix-example
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure your AuthAction credentials**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and replace the placeholders:

   ```env
   AUTHACTION_DOMAIN=your-authaction-tenant-domain
   AUTHACTION_CLIENT_ID=your-authaction-client-id
   AUTHACTION_CLIENT_SECRET=your-authaction-client-secret
   AUTHACTION_REDIRECT_URI=http://localhost:5173/auth/callback
   SESSION_SECRET=your-secure-random-string-min-32-chars
   ```

4. **Configure redirect URIs in AuthAction dashboard**:

   - Login redirect URI: `http://localhost:5173/auth/callback`
   - Logout redirect URI: `http://localhost:5173`

## Usage

1. **Start the development server**:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

2. **Testing Authentication**:
   - Navigate to `http://localhost:5173` and click **Login with AuthAction**.
   - After login you are redirected to `/dashboard` with your name and email shown.
   - Click **Logout** to destroy the session and return to the home page.

## Project Structure

```
authaction-remix-example/
├── app/
│   ├── routes/
│   │   ├── _index.tsx          # Home page (public)
│   │   ├── auth.login.tsx      # Triggers OAuth2 redirect
│   │   ├── auth.callback.tsx   # Handles OAuth2 callback
│   │   ├── auth.logout.tsx     # Destroys session + OIDC logout
│   │   └── dashboard.tsx       # Protected page
│   ├── auth.server.ts          # createRemixAuth setup
│   ├── session.server.ts       # (managed by @authaction/server-sdk)
│   └── root.tsx
├── vite.config.ts
├── .env.example
└── package.json
```

## Code Explanation

### `app/auth.server.ts` — Auth Setup

Calls `createRemixAuth` from `@authaction/server-sdk/remix` with your AuthAction credentials (`domain`, `clientId`, `clientSecret`, `redirectUri`, `sessionSecret`). The returned `auth` object exposes all auth handler methods.

### `app/routes/auth.login.tsx` — Login

A loader route that calls `auth.handleLogin(request)` to redirect the user to AuthAction's authorization endpoint.

### `app/routes/auth.callback.tsx` — Callback

A loader route that calls `auth.handleCallback(request)` to complete the OAuth2 flow — exchanges the code for tokens and redirects to `/dashboard`.

### `app/routes/auth.logout.tsx` — Logout

An action route that calls `auth.handleLogout(request)` to destroy the session cookie and redirect to AuthAction's OIDC logout endpoint.

### `app/routes/dashboard.tsx` — Protected Page

Loader calls `auth.requireSession(request)` and redirects to `/` if no valid session is found. The user's name and email are returned to the component.

## Common Issues

**Redirects not working** — Verify that `AUTHACTION_REDIRECT_URI` matches exactly what is configured in your AuthAction dashboard.

**Session issues** — Ensure `SESSION_SECRET` is a long, random string (32+ characters).

**Network errors** — Verify your app can reach `https://{AUTHACTION_DOMAIN}/oauth2/token`.

## Contributing

Feel free to submit issues or pull requests if you encounter bugs or have suggestions for improvement!
