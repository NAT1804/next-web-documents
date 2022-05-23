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
  Tooltip,
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
import {
  AiFillCheckCircle,
  AiFillHeart,
  AiOutlineCheckCircle,
  AiOutlineHeart
} from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import { MdDescription, MdTitle, MdOutlinePending } from 'react-icons/md';
import { FiFile, FiType } from 'react-icons/fi';
import { Editor } from '@tinymce/tinymce-react';
import { usePostType } from 'hooks';
import { CustomUser } from 'types';

const CFaLock = chakra(FaLock);

const TablePost = ({ title, posts, type, setFunc }) => {
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
        const resp = await api.get('/api/users/profile/likes');
        if (resp.data) {
          setFunc(resp.data.data);
        }
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
              <Th>
                {type === 'like' || type === 'created'
                  ? 'Tiêu đề'
                  : 'Mô tả báo cáo'}
              </Th>
              {type === 'report' ? <Th>Ngày báo cáo</Th> : undefined}
              {type === 'created' ? <Th>Ngày tạo</Th> : undefined}
              {type === 'created' ? <Th>Trạng thái</Th> : <Th>Action</Th>}
            </Tr>
          </Thead>
          {posts.length ? (
            posts.map((post, i) => (
              <Tbody key={i}>
                <Tr>
                  <Td>{post.id}</Td>
                  {type === 'like' || type === 'created' ? (
                    <NextLink href={`/posts/${post.id}`} passHref>
                      <Td
                        cursor={'pointer'}
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '50ch',
                          whiteSpace: 'nowrap'
                        }}
                        _hover={{
                          color: '#cccccc'
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
                  {type === 'created' ? (
                    <Td>{new Date(post.created_at).toDateString()}</Td>
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
                      ) : undefined}
                      {type === 'report' ? (
                        post.resolve === 1 ? (
                          <AiFillCheckCircle color="green" />
                        ) : (
                          <AiOutlineCheckCircle color="yellow" />
                        )
                      ) : undefined}
                      {type === 'created' ? (
                        post.status === 0 ? (
                          <GiCancel color="red" fontSize={24} />
                        ) : post.status === 1 ? (
                          <AiFillCheckCircle color="green" fontSize={24} />
                        ) : (
                          <MdOutlinePending color="yellow" fontSize={24} />
                        )
                      ) : undefined}
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            ))
          ) : (
            <Text>Không có tài liệu nào!</Text>
          )}
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
  const handleClick = () => inputRef.current?.click();

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
      />
      <Button
        position={'absolute'}
        top={'45%'}
        left={'8px'}
        onClick={handleClick}
        leftIcon={<Icon as={FiFile} />}
        zIndex={10}
        backgroundColor={useColorModeValue('primaryGreen', 'primaryOrange')}
        _hover={{
          backgroundColor: useColorModeValue('primaryOrange', 'primaryGreen')
        }}
      >
        Upload
      </Button>
    </>
  );
};

type PostType = {
  id: number;
  name: string;
};

export const ModalPostDocument = ({ onClose, isOpen, setListPostCreated }) => {
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

  const [uploadFile, setUploadFile] = useState([]);
  const [errorUploadFile, setErrorUploadFile] = useState('');
  const handleChangeFile = e => {
    if (validateFiles(e.target.files)) {
      setUploadFile(Array.from(e.target.files));
    }
  };
  const validateFiles = (value: FileList) => {
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 50;
      if (fsMb > MAX_FILE_SIZE) {
        console.log('Touch here');
        setErrorUploadFile(`Max file size ${MAX_FILE_SIZE}MB`);
        return false;
      }
    }
    setErrorUploadFile('');
    return true;
  };

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('post_type_id', values.type);
      if (editorRef.current) {
        formData.append('content', editorRef.current.getContent());
      }
      if (uploadFile.length) {
        formData.append('file', uploadFile[0]);
      }
      const response = await api.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data) {
        onClose();
        notify('success', 'Thêm tài liệu thành công!');
        const resp = await api.get(`/api/users/profile/posts`);
        if (resp.data) {
          setListPostCreated(resp.data.data);
        }
      }
    } catch (error) {
      notify('error', 'Thêm tài liệu thất bại!');
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
                      message: 'Tiêu đề phải có ít nhất 3 ký tự'
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Tiêu đề không được có nhiều hơn 1000 ký tự'
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
                    required: 'Đây là trường bắt buộc'
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
                <FormControl mt={3} isInvalid={Boolean(errorUploadFile)}>
                  <FormLabel>File đính kèm</FormLabel>
                  <Input
                    type="file"
                    multiple={false}
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
                  <FormErrorMessage>{errorUploadFile}</FormErrorMessage>
                </FormControl>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Đóng
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSubmitting}
              disabled={Boolean(errorUploadFile)}
            >
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
  const [listPostCreated, setListPostCreated] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/api/users/profile/likes');
      const resp = await api.get('/api/users/profile/reports');
      // const respo = await api.get(`/api/posts?user_id=${customUser.id}`);
      const respo = await api.get(`/api/users/profile/posts`);

      if (response.data) {
        setListPostLike(response.data.data);
      }

      if (resp.data) {
        setListPostReport(resp.data.data);
      }

      if (respo.data) {
        setListPostCreated(respo.data.data);
      }
    };

    if (session) {
      fetchData();
    }

    return () => {
      setListPostLike([]);
      setListPostReport([]);
      setListPostCreated([]);
    };
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
        <GridItem
          colSpan={{ base: 5, md: 1 }}
          alignSelf="center"
          whiteSpace={{ base: 'nowrap', md: 'break-spaces' }}
          overflowX={{ base: 'scroll', md: 'visible' }}
        >
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
              <Flex justify={'flex-end'}>
                <Button onClick={onOpen}>Thêm tài liệu</Button>
              </Flex>
              <ModalPostDocument
                onClose={onClose}
                isOpen={isOpen}
                setListPostCreated={setListPostCreated}
              />
            </>
          ) : undefined}
          {showPostDocument ? (
            <TablePost
              title="Danh sách tài liệu bạn tải lên"
              posts={listPostCreated}
              type="created"
              setFunc={setListPostCreated}
            />
          ) : undefined}
          {showListPostLike ? (
            <TablePost
              title="Danh sách tài liệu yêu thích"
              posts={listPostLike}
              type="like"
              setFunc={setListPostLike}
            />
          ) : undefined}
          {showListPostReport ? (
            <TablePost
              title="Danh sách tài liệu đã báo cáo"
              posts={listPostReport}
              type="report"
              setFunc={setListPostReport}
            />
          ) : undefined}
        </GridItem>
      </Grid>
    </>
  );
};

export default UserPage;
