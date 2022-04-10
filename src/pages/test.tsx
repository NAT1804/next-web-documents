import NextLink from 'next/link';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { signIn, getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

const SignInPage = ({ csrfToken }) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', tenantKey: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .email('Invalid email address')
            .required('Please enter your email'),
          password: Yup.string().required('Please enter your password'),
          tenantKey: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Please enter your organization name')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            tenantKey: values.tenantKey,
            callbackUrl: `${window.location.origin}`
          });
          if (res?.error) {
            setError(res.error);
          } else {
            setError(null);
          }
          if (res.url) router.push(res.url);
          setSubmitting(false);
        }}
      >
        {formik => {
          <Flex flexDir={'column'} justify="center" align="center" my={'2'}>
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                bgColor={useColorModeValue('primaryGreen', 'primaryOrange')}
              />
              <form>
                <Stack spacing={4} p="1rem" boxShadow="md">
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents={'none'}>
                        <CMdEmail
                          color={useColorModeValue(
                            'primaryGreen',
                            'primaryOrange'
                          )}
                        />
                      </InputLeftElement>
                      <Input
                        type={'email'}
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents={'none'}>
                        <CFaLock
                          color={useColorModeValue(
                            'primaryGreen',
                            'primaryOrange'
                          )}
                        />
                      </InputLeftElement>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <InputRightElement>
                        <Button onClick={handleShowPassword}>
                          {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign={'right'}>
                      <NextLink href={'/forgot-password'} passHref>
                        <Link>Forgot Password?</Link>
                      </NextLink>
                    </FormHelperText>
                  </FormControl>
                  <Button
                    type="submit"
                    width={'full'}
                    borderRadius="0"
                    variant={'solid'}
                    bgColor={useColorModeValue('primaryGreen', 'primaryOrange')}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Stack>
            <Box>
              New to us?{'  '}
              <NextLink href={'/register'} passHref>
                <Link> Sign Up</Link>
              </NextLink>
            </Box>
          </Flex>;
        }}
      </Formik>
    </>
  );
};

export default SignInPage;

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
}
