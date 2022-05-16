import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Moment from 'react-moment';

import { ModalLoginRequest } from 'components/post/PostItem';
import api from 'api';
import ToastMessage from 'components/toast/Toast';
import { MdCheckCircle } from 'react-icons/md';
import { usePostById, useUserById } from 'hooks';
import { ADMIN, CustomUser } from 'types';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

const CommentComponent = ({
  id,
  comment,
  reply,
  created_at,
  likes,
  post_id,
  user_id,
  setDetail
}) => {
  const hasChildren = reply && reply.length;
  const bgColor = useColorModeValue('primaryGreen', 'primaryOrange');
  const bgColorReverse = useColorModeValue('primaryOrange', 'primaryGreen');
  const color = useColorModeValue('white', 'black');
  const { user, isLoading, isError } = useUserById(user_id);
  const { data: session } = useSession();
  const [showReply, setShowReply] = useState(false);
  const [repComment, setRepComment] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const [commentValue, setCommentValue] = useState(comment);

  const customUser = session?.user as CustomUser;

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const [iconLike, setIconLike] = useState<string>(() => {
    if (session) {
      return likes.map(like => like.name).includes(session.user.name)
        ? 'Like'
        : 'Unlike';
    } else {
      return 'Unlike';
    }
  });
  const [likeCount, setlikeCount] = useState(likes.length);

  if (isLoading) {
    return (
      <>
        <Spinner size={'xl'} />
      </>
    );
  }

  if (isError) {
    console.log('Has Error');
  }

  const handleShowReply = () => {
    setShowReply(prev => !prev);
  };

  const onSubmitReply = async e => {
    e.preventDefault();
    const response = await api.post(`api/posts/${post_id}/comment`, {
      comment: repComment,
      parent_id: id
    });
    if (response.data) {
      notify('success', 'Thêm bình luận phản hồi thành công!');
      handleShowReply();
      const res = await api.get(`api/posts/${post_id}`);
      if (res.data) {
        setDetail(res.data);
      }
    } else {
      notify('error', 'Thêm bình luận phản hồi thất bại!');
      handleShowReply();
    }
  };

  const onSubmitEditComment = async e => {
    e.preventDefault();
    const response = await api.post(`api/posts/${post_id}/comment/${id}`, {
      comment: commentValue
    });
    if (response.data) {
      notify('success', 'Sửa bình luận thành công!');
      setEditMode(false);
      const res = await api.get(`api/posts/${post_id}`);
      if (res.data) {
        setDetail(res.data);
      }
    } else {
      notify('error', 'Sửa bình luận thất bại!');
      setEditMode(false);
    }
  };

  const handleLikeComment = async () => {
    if (session) {
      const response = await api.post(
        `api/posts/${post_id}/comment/${id}/like`
      );

      if (response.data) {
        setIconLike(response.data.message);
        if (response.data.message === 'Like') {
          setlikeCount(prev => prev + 1);
          notify('success', 'Like comment successfully!');
        } else {
          setlikeCount(prev => prev - 1);
          notify('success', 'Unlike comment successfully!');
        }
      } else {
        notify('error', 'Like comment failed!');
      }
    } else {
      onOpen();
    }
  };

  return (
    <ListItem key={id}>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Avatar
            name={user?.data?.name}
            color={color}
            bgColor={bgColor}
            size={'sm'}
            src="https://bit.ly/broken-link"
            mr={2}
          />
          <Box fontWeight={'semibold'}>{user?.data?.name}</Box>
        </Flex>
        <Moment fromNow>{created_at}</Moment>
      </Flex>
      {session ? (
        <Box ml={15} my={2}>
          <Box my={2} fontSize={18}>
            {editMode ? (
              <>
                <form onSubmit={onSubmitEditComment}>
                  <Input
                    variant="outline"
                    value={commentValue}
                    onChange={e => setCommentValue(e.target.value)}
                    fontSize={20}
                  />
                  <Button mt={2} mr={2} onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    mt={2}
                    bgColor={bgColor}
                    disabled={!Boolean(commentValue)}
                  >
                    Save
                  </Button>
                </form>
              </>
            ) : (
              <Input
                variant="unstyled"
                value={comment}
                readOnly
                fontSize={20}
              />
            )}
          </Box>
          {showReply && (
            <Box my={2} fontSize={18}>
              <form onSubmit={onSubmitReply}>
                <Input
                  variant="outline"
                  fontSize={20}
                  onChange={e => setRepComment(e.target.value)}
                />
                <Button mt={2} mr={2} onClick={handleShowReply}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  mt={2}
                  bgColor={bgColor}
                  disabled={!Boolean(repComment)}
                >
                  Save
                </Button>
              </form>
            </Box>
          )}
          <Flex alignItems={'center'}>
            <Tooltip
              hasArrow
              label="Like post"
              // bg={useColorModeValue('primaryGreen', 'primaryOrange')}
              // color={useColorModeValue('white', 'black')}
            >
              <HStack
                marginRight="4"
                spacing="1"
                display="flex"
                alignItems="center"
                cursor={'pointer'}
                onClick={handleLikeComment}
              >
                {iconLike === 'Like' ? (
                  <AiFillLike fontSize={30} color="blue" />
                ) : (
                  <AiOutlineLike fontSize={30} />
                )}
                <Text fontSize={20}>{likeCount}</Text>
              </HStack>
            </Tooltip>
            {/* <Button mr={2}>
              <AiOutlineLike fontSize={30} />
            </Button> */}
            {!showReply && (
              <Button bgColor={bgColor} mr={2} onClick={handleShowReply}>
                Reply
              </Button>
            )}
            {session && customUser.permissions[0] === ADMIN ? (
              <>
                <Button
                  bgColor={bgColorReverse}
                  mr={2}
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
                <Button bgColor={'#f33f3f'} onClick={onOpen}>
                  Delete
                </Button>
                <ModalDeleteComment
                  onClose={onClose}
                  isOpen={isOpen}
                  title="Xoá bình luận"
                  body="Bạn muốn xoá bình luận này?"
                  post_id={post_id}
                  comment_id={id}
                  setDetail={setDetail}
                />
              </>
            ) : undefined}
          </Flex>
        </Box>
      ) : (
        <Box my={4}>
          <Input variant="unstyled" value={comment} readOnly fontSize={20} />
        </Box>
      )}
      {hasChildren ? (
        <List spacing={3} ml={10}>
          {reply.map(item => (
            <CommentComponent
              key={item.comment}
              {...item}
              setDetail={setDetail}
            />
          ))}
        </List>
      ) : undefined}
    </ListItem>
  );
};

export const ModalDeleteComment = ({
  onClose,
  isOpen,
  title,
  body,
  post_id,
  comment_id,
  setDetail
}) => {
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const handleDeleteComment = async e => {
    e.preventDefault();
    const response = await api.delete(
      `api/posts/${post_id}/comment/${comment_id}`
    );

    if (response.data) {
      notify('success', 'Xoá bình luận thành công');
      onClose();
      const res = await api.get(`api/posts/${post_id}`);
      if (res.data) {
        setDetail(res.data);
      }
    } else {
      notify('error', 'Xoá bình luận thất bại');
    }
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{body}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleDeleteComment} variant="ghost">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Respond = ({ id, comments, setDetail }) => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColorAvatar = useColorModeValue('primaryGreen', 'primaryOrange');
  const colorAvatar = useColorModeValue('white', 'black');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const onSubmit = async (values: any) => {
    const response = await api.post(`api/posts/${id}/comment`, {
      comment: values.description
    });
    if (response.data) {
      notify('success', 'Thêm bình luận thành công!');
      reset();
      const res = await api.get(`api/posts/${id}`);
      if (res.data) {
        setDetail(res.data);
      }
    } else {
      notify('error', 'Thêm bình luận thất bại!');
    }
  };

  const reverseArr = input => {
    let ret = new Array();
    for (let i = input.length - 1; i >= 0; --i) {
      ret.push(input[i]);
    }
    return ret;
  };

  return (
    <>
      <Grid
        id="respond"
        templateColumns={'repeat(5, 1fr)'}
        gap={6}
        py={5}
        my={5}
      >
        <GridItem m="0 auto" display={{ base: 'none', md: 'flex' }}>
          {session ? (
            <Avatar
              name={session.user.name}
              color={colorAvatar}
              bgColor={bgColorAvatar}
              size={'lg'}
              src="https://bit.ly/broken-link"
            />
          ) : (
            <Avatar bgColor={bgColorAvatar} />
          )}
        </GridItem>
        <GridItem colSpan={{ base: 5, md: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} p="1rem" boxShadow="md">
              <FormControl isInvalid={errors.description}>
                <Textarea
                  placeholder="Để lại bình luận cho bài viết này"
                  {...register('description', {
                    required: 'Bạn cần thêm bình luận!'
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              {session ? (
                <Button
                  type="submit"
                  width={{ base: 'full', md: '50%', lg: '30%' }}
                  alignSelf={'flex-end'}
                  borderRadius="0"
                  variant={'solid'}
                  color={colorAvatar}
                  bgColor={bgColorAvatar}
                  isLoading={isSubmitting}
                >
                  Send
                </Button>
              ) : (
                <Button
                  width={{ base: 'full', md: '50%', lg: '30%' }}
                  alignSelf={'flex-end'}
                  borderRadius="0"
                  variant={'solid'}
                  color={colorAvatar}
                  bgColor={bgColorAvatar}
                  isLoading={isSubmitting}
                  onClick={onOpen}
                >
                  Send
                </Button>
              )}
              <ModalLoginRequest
                onClose={onClose}
                isOpen={isOpen}
                title="Yêu cầu đăng nhập"
                body={'Bạn cần đăng nhập để thực hiện bình luận'}
              />
              ;
            </Stack>
          </form>
        </GridItem>
      </Grid>

      <Text size="30" borderBottom={'solid 1px black'}>
        {comments.length} COMMENTS
      </Text>
      <List spacing={3} mt={3}>
        {reverseArr(comments).map((item, index) => (
          <CommentComponent key={index} {...item} setDetail={setDetail} />
        ))}
      </List>
    </>
  );
};

export default Respond;
