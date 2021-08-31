/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react';
import { useMutation, gql, useApolloClient } from '@apollo/client';

import { Loading } from 'components';
import { useRouter } from 'next/router';
import { Client } from 'lib/ApolloClient';
import { GET_USER } from '../hooks/useAuth';

const LOG_OUT = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;

export default function LogOut() {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [logOut, { loading, error, data }] = useMutation(LOG_OUT, {
    refetchQueries: [{ query: GET_USER }],
  });
  const loggedOut = Boolean(data?.logout?.status);

  useEffect(() => {
    logOut();
    apolloClient.clearStore();
  }, [apolloClient, logOut]);

  if (loggedOut) {
    router.push('/');
  }

  return (
    <>
      {error && (
        <p className="flex justify-center items-center h-screen w-screen text-red-500 bg-red-300 ">
          {error.message}
        </p>
      )}
      {loading && <Loading />}
    </>
  );
}