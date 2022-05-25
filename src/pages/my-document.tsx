import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Text,
  Flex,
  Center,
  Button,
  useColorModeValue,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
  ModalFooter,
  useDisclosure,
  Tooltip
} from '@chakra-ui/react';
import api from 'api';
import { Loading, ToastMessage } from 'components';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { AiFillCheckCircle, AiFillHeart } from 'react-icons/ai';
import { signIn, useSession } from 'next-auth/react';
import { GiCancel } from 'react-icons/gi';
import { MdOutlinePending } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { usePostType } from 'hooks';
import { Editor } from '@tinymce/tinymce-react';
import { reverseArr } from 'helper';

const TablePost = ({ title, posts, setFunc }) => {
  // const notify = useCallback((type, message) => {
  //   ToastMessage({ type, message });
  // }, []);

  // const handleLikePost = async id => {
  //   const response = await api.post(`api/posts/${id}/like`);

  //   if (response.data) {
  //     if (response.data.message === 'Like') {
  //       notify('success', 'Like post successfully!');
  //     } else {
  //       notify('success', 'Unlike post successfully!');
  //       const resp = await api.get('/api/users/profile/likes');
  //       if (resp.data) {
  //         setFunc(resp.data.data);
  //       }
  //     }
  //   } else {
  //     notify('error', 'Like post failed!');
  //   }
  // };

  return (
    <Box w="100%" my={'4'}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption placement="top">{title}</TableCaption>
          <Thead>
            <Tr>
              <Th>Tiêu đề</Th>
              <Th>Ngày tạo</Th>
              <Th>Trạng thái</Th>
            </Tr>
          </Thead>
          {posts.length ? (
            reverseArr(posts).map((post, i) => (
              <Tbody key={i}>
                <Tr>
                  {post.status === 1 ? (
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
                          opacity: 0.75
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
                      {post.title}
                    </Td>
                  )}
                  <Td>
                    {new Date(post.created_at).toLocaleDateString('vi-VN')}
                  </Td>
                  <Td isNumeric>
                    <Tooltip
                      label={
                        post.status === 0
                          ? 'Bị huỷ'
                          : post.status === 1
                          ? 'Đã duyệt'
                          : 'Đang chờ duyệt'
                      }
                    >
                      <Flex justify={'flex-start'} align="center">
                        {post.status === 0 ? (
                          <GiCancel color="red" fontSize={24} />
                        ) : post.status === 1 ? (
                          <AiFillCheckCircle color="green" fontSize={24} />
                        ) : (
                          <MdOutlinePending color="yellow" fontSize={24} />
                        )}
                      </Flex>
                    </Tooltip>
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

const MyDocumentPage = () => {
  const { data: session } = useSession();
  const bgColor = useColorModeValue('primaryGreen', 'primaryOrange');

  const [listPostCreated, setListPostCreated] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const respo = await api.get(`/api/users/profile/posts`);
      if (respo.data) {
        setListPostCreated(respo.data.data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

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
      <Flex justify={'flex-end'}>
        <Button onClick={onOpen}>Thêm tài liệu</Button>
      </Flex>
      <ModalPostDocument
        onClose={onClose}
        isOpen={isOpen}
        setListPostCreated={setListPostCreated}
      />
      <TablePost
        title="Danh sách tài liệu của tôi"
        posts={listPostCreated}
        setFunc={setListPostCreated}
      />
    </>
  );
};

export default MyDocumentPage;
