import '../styles/globals.css'

import { ClerkLoaded, ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'

/**
 * List pages you want to be publicly accessible, or leave empty if
 * every page requires authentication. Use this naming strategy:
 *  "/"              for pages/index.js
 *  "/foo"           for pages/foo/index.js
 *  "/foo/bar"       for pages/foo/bar.js
 *  "/foo/[...bar]"  for pages/foo/[...bar].js
 */
const publicPages = [
  "/",
  "/log-in",
  "/log-in/complete",
  "/register", 
  "/register/verify"
];

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  /**
   * If the current route is listed as public, render it directly.
   * Otherwise, use Clerk to require authentication.
   */
  return (
    <ClerkProvider
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
      navigate={(to) => router.push(to)}
    >
      <Layout>
        {publicPages.includes(router.pathname) ? (
          <>
            <ClerkLoaded>
              <Component {...pageProps} />
            </ClerkLoaded>
          </>          
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </Layout>
    </ClerkProvider>
  );
};

export default MyApp;
