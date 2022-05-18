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
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from '@chakra-ui/react';
import api from 'api';
import { ToastMessage } from 'components';
import { signIn, useSession } from 'next-auth/react';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock } from 'react-icons/fa';
import NextLink from 'next/link';
import { AiFillCheckCircle, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const CFaLock = chakra(FaLock);

const TablePost = ({ title, posts, type }) => {
  // const [iconLike, setIconLike] = useState<string>('Like');

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const handleLikePost = async id => {
    const response = await api.post(`api/posts/${id}/like`);

    if (response.data) {
      // setIconLike(response.data.message);
      if (response.data.message === 'Like') {
        notify('success', 'Like post successfully!');
      } else {
        notify('success', 'Unlike post successfully!');
      }
    } else {
      notify('error', 'Like post failed!');
    }
  };

  return (
    <Box w="100%" my={'4'}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption placement="top">{title}</TableCaption>
          <Thead>
            <Tr>
              <Th>POST ID</Th>
              <Th>{type === 'like' ? 'Tiêu đề' : 'Mô tả báo cáo'}</Th>
              {type === 'report' ? <Th>Ngày báo cáo</Th> : undefined}
              <Th>Action</Th>
            </Tr>
          </Thead>
          {posts.map((post, i) => (
            <>
              <Tbody>
                <Tr>
                  <Td>{post.id}</Td>
                  {type === 'like' ? (
                    <NextLink href={`/posts/${post.id}`} passHref>
                      <Td cursor={'pointer'}>{post.title}</Td>
                    </NextLink>
                  ) : (
                    <Td>{post.description}</Td>
                  )}
                  {type === 'report' ? (
                    <Td>{new Date(post.updated_at).toDateString()}</Td>
                  ) : undefined}
                  <Td isNumeric>
                    <Flex justify={'center'} align="center">
                      {type === 'like' ? (
                        <AiFillHeart
                          size={18}
                          color="red"
                          cursor={'pointer'}
                          onClick={() => handleLikePost(post.id)}
                        />
                      ) : (
                        <AiFillCheckCircle />
                      )}
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </>
          ))}
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </Box>
  );
};

const UserPage = () => {
  const { data: session } = useSession();
  const bgColor = useColorModeValue('primaryGreen', 'primaryOrange');
  const bgColorHover = useColorModeValue('#0ac19f', '#f7a55c');
  const color = useColorModeValue('white', 'black');
  const [showChangePassword, setShowChangePassword] = useState(true);
  const [showListPostLike, setShowListPostLike] = useState(false);
  const [showListPostReport, setShowListPostReport] = useState(false);

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

    if (session) {
      fetchData();
    }
  }, [session]);

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

  const handleSwitch = type => {
    setShowChangePassword(false);
    setShowListPostLike(false);
    setShowListPostReport(false);
    switch (type) {
      case 'P':
        setShowChangePassword(true);
        break;
      case 'L':
        setShowListPostLike(true);
        break;
      case 'R':
        setShowListPostReport(true);
        break;
      default:
        break;
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
      <Container maxW={'lg'}></Container>
      <Grid templateColumns="repeat(5, 1fr)" gap={{ base: 0, md: 10 }}>
        <GridItem colSpan={{ base: 5, md: 1 }} alignSelf="center">
          <Button
            bgColor={showChangePassword ? bgColor : undefined}
            m={2}
            onClick={() => handleSwitch('P')}
            _hover={{
              backgroundColor: bgColorHover
            }}
          >
            Đổi mật khẩu
          </Button>
          <Button
            bgColor={showListPostLike ? bgColor : undefined}
            m={2}
            onClick={() => handleSwitch('L')}
            _hover={{
              backgroundColor: bgColorHover
            }}
          >
            Danh sách tài liệu yêu thích
          </Button>
          <Button
            bgColor={showListPostReport ? bgColor : undefined}
            m={2}
            onClick={() => handleSwitch('R')}
            _hover={{
              backgroundColor: bgColorHover
            }}
          >
            Danh sách tài liệu đã báo cáo
          </Button>
        </GridItem>
        <GridItem colSpan={{ base: 5, md: 4 }}>
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
                        <AlertDescription display="block">
                          {error}
                        </AlertDescription>
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
                                message:
                                  'Password must have at least 6 characters'
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
                            type={
                              showNewPasswordConfirmation ? 'text' : 'password'
                            }
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
          {showListPostLike ? (
            <TablePost
              title="Danh sách tài liệu yêu thích"
              posts={listPostLike}
              type="like"
            />
          ) : undefined}
          {showListPostReport ? (
            <TablePost
              title="Danh sách tài liệu đã báo cáo"
              posts={listPostReport}
              type="report"
            />
          ) : undefined}
        </GridItem>
      </Grid>
    </>
  );
};

export default UserPage;
