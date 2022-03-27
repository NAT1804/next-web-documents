import NextLink from 'next/link';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(prevState => !prevState);
  return (
    <Flex flexDir={'column'} justify="center" align="center" my={'2'}>
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bgColor={useColorModeValue('primaryGreen', 'primaryOrange')} />
        <form>
          <Stack spacing={4} p="1rem" boxShadow="md">
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                  <CFaUserAlt
                    color={useColorModeValue('primaryGreen', 'primaryOrange')}
                  />
                </InputLeftElement>
                <Input type={'text'} placeholder="Username" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                  <CMdEmail
                    color={useColorModeValue('primaryGreen', 'primaryOrange')}
                  />
                </InputLeftElement>
                <Input type={'email'} placeholder="Email address" />
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
                />
                <InputRightElement>
                  <Button onClick={handleShowPassword}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
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
                  placeholder="Confirm password"
                />
                <InputRightElement>
                  <Button onClick={handleShowPassword}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              width={'full'}
              borderRadius="0"
              variant={'solid'}
              bgColor={useColorModeValue('primaryGreen', 'primaryOrange')}
            >
              Sign up
            </Button>
          </Stack>
        </form>
      </Stack>
      <Box>
        Have already account?{'  '}
        <NextLink href={'/login'} passHref>
          <Link> Sign In</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default Register;
