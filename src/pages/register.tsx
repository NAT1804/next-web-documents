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
                  placeholder="Tên tài khoản"
                  {...register('name', {
                    required: 'Đây là trường bắt buộc',
                    minLength: {
                      value: 3,
                      message: 'Tên đăng nhập phải có ít nhất 3 ký tự'
                    },
                    maxLength: {
                      value: 100,
                      message: 'Tên đăng nhập phải ít hơn 100 ký tự'
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
                    required: 'Đây là trường bắt buộc',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Địa chỉ email không hợp lệ'
                    },
                    maxLength: {
                      value: 255,
                      message: 'Địa chỉ email phải có ít hơn 255 ký tự'
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
                  placeholder="Mật khẩu"
                  {...register('password', {
                    required: 'Đây là trường bắt buộc',
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự'
                    },
                    maxLength: {
                      value: 255,
                      message: 'Mật khẩu phải có ít hơn 255 ký tự'
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
                  placeholder="Xác nhận mật khẩu"
                  {...register('password_confirmation', {
                    required: 'Đây là trường bắt buộc',
                    validate: value =>
                      value === password.current || 'Mật khẩu không trùng khớp'
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
              Đăng ký
            </Button>
          </Stack>
        </form>
      </Stack>
      <Box>
        Đã có tài khoản?{'  '}
        <NextLink href={'/login'} passHref>
          <Link>Đăng nhập</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
