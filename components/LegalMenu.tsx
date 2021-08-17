/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getNextStaticProps } from '@wpengine/headless/next';
import { getApolloClient } from '@wpengine/headless';
import { GetStaticPropsContext } from 'next';
import { gql, useQuery } from '@apollo/client';

const menuQuery = gql`
  query MyQuery {
    menu(id: "dGVybToyNQ==") {
      menuItems {
        nodes {
          url
          label
          id
        }
      }
    }
  }
`;

interface MenuQuery {
  // [node: string]: { label: string; url: string; id: string };
  label: string;
  url: string;
  id: string;
}
interface Props {
  open: boolean | any;
}

const LegalMenu = ({ open }: Props) => {
  const router = useRouter();
  const { data } = useQuery(menuQuery);
  // const menu = data?.menu.menuItems.edges;
  // console.log(data);

  const variants = {
    open: {
      transition: { staggerChildren: 0.07 },
      y: 0,
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const variant = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <motion.div
      className="z-70 text-white space-y-6"
      initial={{ x: '100%' }}
      animate={{
        x: 0,
      }}
      exit={{
        x: '100%',
      }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
    >
      <motion.ul
        className="flex flex-col space-y-6 mt-10"
        initial="false"
        variants={variants}
        animate={open ? 'open' : 'closed'}
      >
        {/* {menu &&
          menu.map((item: MenuQuery) => (
            <motion.li
              key={item.id}
              variants={variant}
              //   whileHover={{ scale: 1.1 }}
              //   whileTap={{ scale: 0.95 }}
              className="px-3 hover:text-secondary w-full flex"
            >
              <div
                className={`${
                  router.pathname === '/[[...page]]' ? 'active' : ''
                } px-4 mb-3 mr-3`}
              />
              <Link href={item.url} aria-label={item.label}>
                {item.label}
              </Link>
            </motion.li>
          ))} */}

        <motion.li
          variants={variant}
          //   whileHover={{ scale: 1.1 }}
          //   whileTap={{ scale: 0.95 }}
          className="px-3 hover:text-secondary w-full flex"
        >
          <div
            className={`${
              router.pathname === '/coa' ? 'active' : ''
            } px-4 mb-3 mr-3`}
          />
          <Link href="/coa" aria-label="Shop">
            Certificates of Authentication
          </Link>
        </motion.li>

        <motion.li
          variants={variant}
          //   whileHover={{ scale: 1.1 }}
          //   whileTap={{ scale: 0.95 }}
          className="px-3 hover:text-secondary w-3/4 flex"
        >
          <div
            className={`${
              router.pathname === '/privacy-policy' ? 'active' : ''
            } px-4 mb-3 mr-3`}
          />
          <Link href="/privacy-policy">Privacy Policy</Link>
        </motion.li>

        <motion.li
          variants={variant}
          //   whileHover={{ scale: 1.1 }}
          //   whileTap={{ scale: 0.95 }}
          className="px-3 hover:text-secondary w-3/4 flex"
        >
          <div
            className={`${
              router.pathname === '/return-policy' ? 'active' : ''
            } px-4 mb-3 mr-3`}
          />
          <Link href="/return-policy">Return Policy</Link>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = getApolloClient(context);
  void client.query({
    query: menuQuery,
  });
  return getNextStaticProps(context);
}

export default LegalMenu;