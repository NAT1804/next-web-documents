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
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
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
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import api from 'api';
import { ToastMessage } from 'components';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { FaLock } from 'react-icons/fa';
import NextLink from 'next/link';
import { AiFillCheckCircle, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdDescription, MdTitle } from 'react-icons/md';
import { FiFile, FiType } from 'react-icons/fi';
import { Editor } from '@tinymce/tinymce-react';
import { usePostType } from 'hooks';

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
                      <Td
                        cursor={'pointer'}
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '50ch',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {post.title}
                      </Td>
                    </NextLink>
                  ) : (
                    <Td
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '50ch',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {post.description}
                    </Td>
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
        </Table>
      </TableContainer>
    </Box>
  );
};

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
};

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };
  // const [uploadFile, setUploadFile] = useState();
  const handleClick = () => inputRef.current?.click();

  // const handleChangeFile = e => {
  //   console.log(e.target.files);
  // };

  return (
    <>
      <Input
        type={'file'}
        multiple={multiple || false}
        // hidden
        accept={accept}
        {...rest}
        ref={e => {
          ref(e);
          inputRef.current = e;
        }}
        // onChange={e => handleChangeFile(e)}
      />
      <Button
        position={'absolute'}
        top={'45%'}
        left={'8px'}
        onClick={handleClick}
        leftIcon={<Icon as={FiFile} />}
        zIndex={10}
      >
        Upload
      </Button>
    </>
  );
};

// type FormValues = {
//   file_: FileList;
// };

type PostType = {
  id: number;
  name: string;
};

export const ModalPostDocument = ({ onClose, isOpen }) => {
  const editorRef = useRef(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const { postType, isLoading, isError } = usePostType();

  const listTypePost = postType.data.reduce((prev: any[], curr: any) => {
    prev = [...prev, { id: curr.id, name: curr.name } as PostType];
    let temp = [...prev];
    if (curr.children.length) {
      temp = [
        ...prev.concat(
          curr.children.map(e => ({ id: e.id, name: e.name } as PostType))
        )
      ];
    }
    return temp;
  }, [] as PostType[]);

  const validateFiles = (value: FileList) => {
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 50;
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 50mb';
      }
    }
    return true;
  };

  const [uploadFile, setUploadFile] = useState([]);
  const handleChangeFile = e => {
    setUploadFile(Array.from(e.target.files));
  };

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('post_type_id', values.type);
      formData.append('content', editorRef.current.getContent());
      formData.append('file', uploadFile[0]);
      const response = await api.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      size="xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Thêm bài viết</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} p="1rem" boxShadow="md">
              <FormControl isInvalid={errors.title}>
                <FormLabel>Tiêu đề</FormLabel>
                <Input
                  type={'text'}
                  placeholder="Tiêu đề"
                  {...register('title', {
                    required: 'This is required',
                    minLength: {
                      value: 3,
                      message: 'Title must have at least 3 characters'
                    },
                    maxLength: {
                      value: 100,
                      message: 'Title must not be greater than 1000 characters'
                    }
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Mô tả</FormLabel>
                <Input
                  type={'text'}
                  placeholder="Mô tả"
                  {...register('description')}
                />
              </FormControl>
              <FormControl isInvalid={errors.type}>
                <FormLabel>Thể loại</FormLabel>
                <Select
                  {...register('type', {
                    required: 'This is required'
                  })}
                >
                  {isLoading && (
                    <>
                      <Spinner />
                    </>
                  )}
                  {isError && (
                    <>
                      <Text>Has Error</Text>
                    </>
                  )}
                  {listTypePost.map((type, index) => (
                    <option key={index} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.type && errors.type.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Nội dung</FormLabel>
                <Editor
                  apiKey="dibqxf1jzddz5i59193rhfsyk8okhboygf7yn9e3haeq46ne"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>Thêm nội dung cho tài liệu!</p>"
                  init={{
                    height: 200,
                    menubar: false,
                    // plugins: [
                    //   'advlist autolink lists link image charmap print preview anchor',
                    //   'searchreplace visualblocks code fullscreen',
                    //   'insertdatetime media table paste code help wordcount'
                    // ],
                    toolbar:
                      'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
                <FormControl mt={3} isInvalid={errors.file_}>
                  <FormLabel>File đính kèm</FormLabel>
                  <Input
                    type="file"
                    multiple={false}
                    // hidden
                    accept={'application/pdf'}
                    onChange={e => handleChangeFile(e)}
                  />
                  {/* <FileUpload
                    accept={'application/pdf'}
                    multiple={false}
                    register={register('file_', {
                      validate: validateFiles
                    })}
                  /> */}
                  <FormErrorMessage>
                    {errors.file_ && errors.file_.message}
                  </FormErrorMessage>
                </FormControl>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Đóng
            </Button>
            <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
              Thêm
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

const UserPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const bgColor = useColorModeValue('primaryGreen', 'primaryOrange');
  const bgColorHover = useColorModeValue('#0ac19f', '#f7a55c');
  const color = useColorModeValue('white', 'black');
  const [showChangePassword, setShowChangePassword] = useState(true);
  const [showPostDocument, setShowPostDocument] = useState(false);
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
        setListPostLike(response.data.data);
      } else {
      }

      if (resp.data) {
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
    try {
      const response = await api.post('api/auth/change-password', {
        old_password: values.old_password,
        new_password: values.new_password,
        new_password_confirmation: values.confirm_new_password
      });
      if (response.data) {
        notify('success', 'Change password successfully!!');
        reset();
      }
    } catch (error) {
      setError('Has error!!');
      notify('error', 'Change password failed!!');
    }
  };

  const handleSwitch = type => {
    setShowChangePassword(false);
    setShowPostDocument(false);
    setShowListPostLike(false);
    setShowListPostReport(false);
    switch (type) {
      case 'P':
        setShowChangePassword(true);
        break;
      case 'T':
        setShowPostDocument(true);
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
          <Text fontWeight={'bold'} fontSize={20} my={5} mx={2}>
            Bạn chưa đăng nhập
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
            Đăng nhập
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
            m={2}
            onClick={e => {
              e.preventDefault();
              signOut({ callbackUrl: `${window.location.href}` });
            }}
            _hover={{
              backgroundColor: bgColorHover
            }}
          >
            Đăng xuất
          </Button>
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
            bgColor={showPostDocument ? bgColor : undefined}
            m={2}
            onClick={() => handleSwitch('T')}
            _hover={{
              backgroundColor: bgColorHover
            }}
          >
            Tài liệu của tôi
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
          {showPostDocument ? (
            <>
              <Button onClick={onOpen}>Thêm tài liệu</Button>
              <ModalPostDocument onClose={onClose} isOpen={isOpen} />
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
