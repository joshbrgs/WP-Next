/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as fbq from '../../lib/fpixel';

const handleRouteChange = () => {
  fbq.pageview();
};

const FacebookPixel = ({ children }: any): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    // This pageview only trigger first time (it is important for Pixel to have real information)
    fbq.pageview();

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return children;
};

export default FacebookPixel;
