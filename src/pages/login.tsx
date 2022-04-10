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

import { useAppDispatch, useAppSelector } from 'app/hook';
import {
  authLoginSelector,
  authLoginAction,
  selectUserLogin
} from 'features/login';
// import { unwrapResult } from '@reduxjs/toolkit';

const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { type, token, data, message, pending, error } =
    useAppSelector(selectUserLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(prevState => !prevState);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(authLoginAction({ email, password }));
    } catch (rejectedValueOrSerializedError) {
      console.error(rejectedValueOrSerializedError);
    }
  };

  return (
    <Flex flexDir={'column'} justify="center" align="center" my={'2'}>
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bgColor={useColorModeValue('primaryGreen', 'primaryOrange')} />
        {pending && <Text>Loading...</Text>}
        {data && <Text>{data.name}</Text>}
        {error && <Text>Something went wrong!!!</Text>}
        <form>
          <Stack spacing={4} p="1rem" boxShadow="md">
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                  <CMdEmail
                    color={useColorModeValue('primaryGreen', 'primaryOrange')}
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
                    color={useColorModeValue('primaryGreen', 'primaryOrange')}
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
    </Flex>
  );
};

export default LoginPage;
