/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

import useAuth from '../../hooks/useAuth';
import Loading from './Loading';

export default function Authed({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { loggedIn, loading } = useAuth();
  const router = useRouter();

  // Navigate UnAuthenticated Users to login
  useEffect(() => {
    if (!loading && !loggedIn) {
      void router.push('/login');
    }
  }, [loggedIn, loading, router]);

  if (loggedIn) {
    return <>{children}</>;
  }

  return <Loading />;
}
