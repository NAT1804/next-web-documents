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
  Grid,
  GridItem,
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
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock } from 'react-icons/fa';

import { VPostItem, Section } from '../../components';

const CFaLock = chakra(FaLock);

const UserPage = () => {
  const { data: session } = useSession();
  const bgColor = useColorModeValue('primaryGreen', 'primaryOrange');
  const color = useColorModeValue('white', 'black');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] =
    useState(false);

  const [listPostLike, setListPostLike] = useState([]);
  const [listPostReport, setListPostReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/api/users/profile/likes');
      const resp = await api.get('/api/users/profile/reports');

      if (response.data) {
        console.log('test', response.data);
        setListPostLike(response.data.data);
      } else {
      }

      if (resp.data) {
        console.log('test', resp.data);
        setListPostReport(resp.data.data);
      } else {
      }
    };

    fetchData();
  }, []);

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
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        <GridItem colSpan={{ base: 3, md: 2 }}></GridItem>
        <GridItem
          display={'block'}
          colSpan={{ base: 3, md: 1 }}
          position="sticky"
          top={180}
        >
          {/* <ListVPost /> */}
        </GridItem>
      </Grid>
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
                        type={showOldPassword ? 'text' : 'password'}
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
                        <Button
                          onClick={() => setShowOldPassword(prev => !prev)}
                        >
                          {showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
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
                        type={showNewPassword ? 'text' : 'password'}
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
                        <Button
                          onClick={() => setShowNewPassword(prev => !prev)}
                        >
                          {showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
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
                        type={showNewPasswordConfirmation ? 'text' : 'password'}
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
                        <Button
                          onClick={() =>
                            setShowNewPasswordConfirmation(prev => !prev)
                          }
                        >
                          {showNewPasswordConfirmation ? (
                            <ViewOffIcon />
                          ) : (
                            <ViewIcon />
                          )}
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
      {/* {listPostLike.map((post, i) => (
        <Section key={i} delay={0.2} x={(i + 1) * 100}>
          <VPostItem post={post} />
        </Section>
      ))}
      {listPostReport.map((post, i) => (
        <Section key={i} delay={0.2} x={(i + 1) * 100}>
          <VPostItem post={post} />
        </Section>
      ))} */}
    </>
  );
};

export default UserPage;
