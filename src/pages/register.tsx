import NextLink from 'next/link';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import api from 'api';
import { signIn } from 'next-auth/react';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(prevState => !prevState);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword(prevState => !prevState);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const [error, setError] = useState(null);

  const onSubmit = async (values: any) => {
    const res = await api.post(`/api/auth/register`, values);

    login(res.data, values.password);
  };

  const login = async (response: any, password: string) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: response.data.email,
      password,
      callbackUrl: `${window.location.origin}`
    });
    if (res?.error) {
      setError(res.error);
    }
    if (res.url) router.push(res.url);
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
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription display="block">{error}</AlertDescription>
            </Box>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setError(null)}
            />
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} p="1rem" boxShadow="md">
            <FormControl isInvalid={errors.name}>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                  <CFaUserAlt
                    color={useColorModeValue('primaryGreen', 'primaryOrange')}
                  />
                </InputLeftElement>
                <Input
                  type={'text'}
                  placeholder="T??n t??i kho???n"
                  {...register('name', {
                    required: '????y l?? tr?????ng b???t bu???c',
                    minLength: {
                      value: 3,
                      message: 'T??n ????ng nh???p ph???i c?? ??t nh???t 3 k?? t???'
                    },
                    maxLength: {
                      value: 100,
                      message: 'T??n ????ng nh???p ph???i ??t h??n 100 k?? t???'
                    }
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                  <CMdEmail
                    color={useColorModeValue('primaryGreen', 'primaryOrange')}
                  />
                </InputLeftElement>
                <Input
                  type={'email'}
                  placeholder="Email"
                  {...register('email', {
                    required: '????y l?? tr?????ng b???t bu???c',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '?????a ch??? email kh??ng h???p l???'
                    },
                    maxLength: {
                      value: 255,
                      message: '?????a ch??? email ph???i c?? ??t h??n 255 k?? t???'
                    }
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                  <CFaLock
                    color={useColorModeValue('primaryGreen', 'primaryOrange')}
                  />
                </InputLeftElement>
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="M???t kh???u"
                  {...register('password', {
                    required: '????y l?? tr?????ng b???t bu???c',
                    minLength: {
                      value: 6,
                      message: 'M???t kh???u ph???i c?? ??t nh???t 6 k?? t???'
                    },
                    maxLength: {
                      value: 255,
                      message: 'M???t kh???u ph???i c?? ??t h??n 255 k?? t???'
                    }
                  })}
                />
                <InputRightElement>
                  <Button onClick={handleShowPassword}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password_confirmation}>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                  <CFaLock
                    color={useColorModeValue('primaryGreen', 'primaryOrange')}
                  />
                </InputLeftElement>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="X??c nh???n m???t kh???u"
                  {...register('password_confirmation', {
                    required: '????y l?? tr?????ng b???t bu???c',
                    validate: value =>
                      value === password.current || 'M???t kh???u kh??ng tr??ng kh???p'
                  })}
                />
                <InputRightElement>
                  <Button onClick={handleShowConfirmPassword}>
                    {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password_confirmation &&
                  errors.password_confirmation.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              width={'full'}
              borderRadius="0"
              variant={'solid'}
              bgColor={useColorModeValue('primaryGreen', 'primaryOrange')}
              color={useColorModeValue('white', 'black')}
              isLoading={isSubmitting}
            >
              ????ng k??
            </Button>
          </Stack>
        </form>
      </Stack>
      <Box>
        ???? c?? t??i kho???n?{'  '}
        <NextLink href={'/login'} passHref>
          <Link>????ng nh???p</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
