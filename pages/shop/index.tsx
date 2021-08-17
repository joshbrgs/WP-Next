/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/rules-of-hooks */
import { useGeneralSettings } from '@wpengine/headless/react';
import { Drawer, Cart, ShopNav, Footer } from 'components';
import Heading from 'components/Heading';
import Link from 'next/link';
import React from 'react';

const index = (): JSX.Element => {
  const settings = useGeneralSettings();

  return (
    <main className="font-cochin">
      <div className="sticky top-0 z-70" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform -translate-x-8">
          <ShopNav catagory="Collections" link="/shop" />
        </div>
      </div>
      <section className="">
        <div className="flex font-bold font-mont text-5xl tracking-widest uppercase justify-center pt-10 cursor-default">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="mt-24 bg-midgray w-screen h-full ml-20 pl-8 pt-28">
          <div className="text-3xl tracking-wide uppercase pb-10 cursor-default">
            Collections
          </div>
          <div>
            <Link href={'/shop/id'}>All</Link>
          </div>
        </div>
      </section>
      <Footer copyrightHolder={settings?.title} key="footer" />
    </main>
  );
};

export default index;
