import React from 'react';
import Loginform from '../components/Loginform';
import { Box, Center, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import Head from 'next/head';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | Bonding over Bindings</title>
      </Head>
      <Box mt={20}>
        <Center>
          <Text textAlign='center' fontSize='2xl' fontWeight='300'>
            Login to continue
          </Text>
        </Center>
        <br />
        <br />
        <Center>
          <Loginform />
        </Center>
        <Center>
          <NextLink href='/signup'>
            <Link m={2}>
              <Text as='mark' fontSize='md' opacity='80%'>
                New Here? Click here to Register
              </Text>
            </Link>
          </NextLink>
        </Center>
      </Box>
    </>
  );
}
