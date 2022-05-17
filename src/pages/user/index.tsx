import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  chakra,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import api from 'api';
import { ToastMessage } from 'components';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock } from 'react-icons/fa';

const CFaLock = chakra(FaLock);

const UserPage = () => {
  const { data: session } = useSession();
  const bgColor = useColorModeValue('primaryGreen', 'primaryOrange');
  const color = useColorModeValue('white', 'black');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(prevState => !prevState);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    reset
  } = useForm();

  const newPassword = useRef({});
  newPassword.current = watch('new_password', '');
  const [error, setError] = useState(null);

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const onSubmit = async (values: any) => {
    const response = await api.post('api/auth/change-password', {
      old_password: values.old_password,
      new_password: values.new_password,
      new_password_confirmation: values.confirm_new_password
    });
    console.log(response);
    if (response.data) {
      notify('success', 'Change password successfully!!');
      reset();
    } else {
      setError('Has error!!');
      notify('error', 'Change password failed!!');
    }
  };

  if (!session) {
    return (
      <>
        <Center>
          <Text fontWeight={'bold'} fontSize={20} my={5} mx={3}>
            You not log in!
          </Text>
          <Button
            variant={'solid'}
            bgColor={bgColor}
            mx={3}
            onClick={e => {
              e.preventDefault();
              signIn();
            }}
          >
            Log In
          </Button>
        </Center>
      </>
    );
  }

  return (
    <>
      <Center>
        <Button onClick={() => setShowChangePassword(prev => !prev)}>
          Đổi mật khẩu
        </Button>
      </Center>
      {showChangePassword ? (
        <>
          <Flex flexDir={'column'} justify="center" align="center" my={'2'}>
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >
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
                  <FormControl isInvalid={errors.old_password}>
                    <InputGroup>
                      <InputLeftElement pointerEvents={'none'}>
                        <CFaLock color={bgColor} />
                      </InputLeftElement>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Old password"
                        {...register('old_password', {
                          required: 'This is required',
                          minLength: {
                            value: 6,
                            message: 'Password must have at least 6 characters'
                          },
                          maxLength: {
                            value: 255,
                            message:
                              'Password must not be greater than 255 characters'
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
                      {errors.old_password && errors.old_password.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.new_password}>
                    <InputGroup>
                      <InputLeftElement pointerEvents={'none'}>
                        <CFaLock color={bgColor} />
                      </InputLeftElement>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="New password"
                        {...register('new_password', {
                          required: 'This is required',
                          minLength: {
                            value: 6,
                            message:
                              'New password must have at least 6 characters'
                          },
                          maxLength: {
                            value: 255,
                            message:
                              'New password must not be greater than 255 characters'
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
                      {errors.new_password && errors.new_password.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.confirm_new_password}>
                    <InputGroup>
                      <InputLeftElement pointerEvents={'none'}>
                        <CFaLock color={bgColor} />
                      </InputLeftElement>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        {...register('confirm_new_password', {
                          required: 'This is required',
                          minLength: {
                            value: 6,
                            message:
                              'New password must have at least 6 characters'
                          },
                          maxLength: {
                            value: 255,
                            message:
                              'New password must not be greater than 255 characters'
                          },
                          validate: value =>
                            value === newPassword.current ||
                            'The confirm password not match'
                        })}
                      />
                      <InputRightElement>
                        <Button onClick={handleShowPassword}>
                          {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.confirm_new_password &&
                        errors.confirm_new_password.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    type="submit"
                    width={'full'}
                    borderRadius="0"
                    variant={'solid'}
                    color={color}
                    bgColor={bgColor}
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Flex>
        </>
      ) : undefined}
    </>
  );
};

export default UserPage;
