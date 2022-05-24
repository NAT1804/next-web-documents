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
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

const LoginPage = ({ csrfToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(prevState => !prevState);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { callbackUrl } = router.query;
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (values: any) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${callbackUrl}`
    });
    if (res?.error) {
      setError(res.error);
    }
    if (res.url) router.push(res.url);
  };

  if (session) {
    router.push('/');
  }

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
            <Input type={'hidden'} name="csrfToken" defaultValue={csrfToken} />
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  {...register('password', {
                    required: 'Đây là trường bắt buộc'
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
              {/* <FormHelperText textAlign={'right'}>
                <NextLink href={'/forgot-password'} passHref>
                  <Link>Forgot Password?</Link>
                </NextLink>
              </FormHelperText> */}
            </FormControl>
            <Button
              type="submit"
              width={'full'}
              borderRadius="0"
              variant={'solid'}
              color={useColorModeValue('white', 'black')}
              bgColor={useColorModeValue('primaryGreen', 'primaryOrange')}
              isLoading={isSubmitting}
            >
              Đăng nhập
            </Button>
          </Stack>
        </form>
      </Stack>
      <Box>
        Chưa có tài khoản?{'  '}
        <NextLink href={'/register'} passHref>
          <Link>Đăng ký</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default LoginPage;

LoginPage.getInitialProps = async context => {
  return {
    csrfToken: await getCsrfToken(context)
  };
};
