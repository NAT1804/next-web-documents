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
import { useUserById } from 'hooks';
import { ADMIN, CustomUser } from 'types';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { reverseArr } from 'helper';
import 'moment/locale/vi';

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
  const customUser = session?.user as CustomUser;
  const [commentValue, setCommentValue] = useState<string>(() => {
    if (session) {
      if (customUser.id === user_id) {
        return comment;
      } else {
        return '';
      }
    } else {
      return '';
    }
  });

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
      notify('success', 'Th??m b??nh lu???n ph???n h???i th??nh c??ng!');
      handleShowReply();
      const res = await api.get(`api/posts/${post_id}`);
      if (res.data) {
        setDetail(res.data);
      }
    } else {
      notify('error', 'Th??m b??nh lu???n ph???n h???i th???t b???i!');
      handleShowReply();
    }
  };

  const onSubmitEditComment = async e => {
    e.preventDefault();
    const response = await api.post(`api/posts/${post_id}/comment/${id}`, {
      comment: commentValue
    });
    if (response.data) {
      notify('success', 'S???a b??nh lu???n th??nh c??ng!');
      setEditMode(false);
      const res = await api.get(`api/posts/${post_id}`);
      if (res.data) {
        setDetail(res.data);
      }
    } else {
      notify('error', 'S???a b??nh lu???n th???t b???i!');
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
          notify('success', 'Th??ch b??nh lu???n th??nh c??ng!');
        } else {
          setlikeCount(prev => {
            if (prev <= 0) return 0;
            else {
              return prev - 1;
            }
          });
          notify('success', 'B??? th??ch b??nh lu???n th??nh c??ng!');
        }
      } else {
        notify('error', 'C?? l???i x???y ra!');
      }
    } else {
      onOpen();
    }
  };

  return (
    <ListItem key={id}>
      <Flex align="flex-start" justify="flex-start">
        <Avatar
          name={user?.data?.name}
          color={color}
          bgColor={bgColor}
          size={'md'}
          src="https://bit.ly/broken-link"
          mr={2}
        />
        <Box>
          <Flex align="center">
            {session && session.user.name === user?.data?.name ? (
              <Box
                fontWeight={'semibold'}
                mr={3}
                borderRadius={10}
                px={2}
                backgroundColor={'#ccc'}
              >
                {user?.data?.name}
              </Box>
            ) : (
              <Box fontWeight={'semibold'} mr={3}>
                {user?.data?.name}
              </Box>
            )}
            <Moment fromNow>{created_at}</Moment>
          </Flex>
          {session ? (
            <Box my={2}>
              <Box my={2} fontSize={14}>
                {editMode ? (
                  <>
                    <form onSubmit={onSubmitEditComment}>
                      <Input
                        variant="outline"
                        value={commentValue}
                        onChange={e => setCommentValue(e.target.value)}
                        fontSize={18}
                      />
                      <Button mt={2} mr={2} onClick={() => setEditMode(false)}>
                        Hu???
                      </Button>
                      <Button
                        type="submit"
                        mt={2}
                        bgColor={bgColor}
                        disabled={!Boolean(commentValue)}
                      >
                        L??u
                      </Button>
                    </form>
                  </>
                ) : (
                  <Input
                    variant="unstyled"
                    value={comment}
                    readOnly
                    fontSize={18}
                  />
                )}
              </Box>
              {showReply && (
                <Box my={2} fontSize={18}>
                  <form onSubmit={onSubmitReply}>
                    <Input
                      variant="outline"
                      fontSize={18}
                      onChange={e => setRepComment(e.target.value)}
                    />
                    <Button mt={2} mr={2} onClick={handleShowReply}>
                      Hu???
                    </Button>
                    <Button
                      type="submit"
                      mt={2}
                      bgColor={bgColor}
                      disabled={!Boolean(repComment)}
                    >
                      L??u
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
                      <AiFillLike fontSize={20} color={bgColor} />
                    ) : (
                      <AiOutlineLike fontSize={20} />
                    )}
                    <Text fontSize={20}>{likeCount}</Text>
                  </HStack>
                </Tooltip>
                {/* <Button mr={2}>
              <AiOutlineLike fontSize={30} />
            </Button> */}
                {!showReply && (
                  <Button
                    variant={'ghost'}
                    // bgColor={bgColor}
                    mr={2}
                    onClick={handleShowReply}
                  >
                    Tr??? l???i
                  </Button>
                )}
                {session && customUser.id === user_id ? (
                  <Button
                    variant={'ghost'}
                    // bgColor={bgColorReverse}
                    mr={2}
                    onClick={() => setEditMode(true)}
                  >
                    Ch???nh s???a
                  </Button>
                ) : undefined}
                {session && customUser.permissions[0] === ADMIN ? (
                  <>
                    <Button
                      variant={'ghost'}
                      // bgColor={'#f33f3f'}
                      onClick={onOpen}
                    >
                      Xo??
                    </Button>
                    <ModalDeleteComment
                      onClose={onClose}
                      isOpen={isOpen}
                      title="Xo?? b??nh lu???n"
                      body="B???n mu???n xo?? b??nh lu???n n??y?"
                      post_id={post_id}
                      comment_id={id}
                      setDetail={setDetail}
                    />
                  </>
                ) : undefined}
              </Flex>
            </Box>
          ) : (
            <Box my={2}>
              <Input
                variant="unstyled"
                value={comment}
                readOnly
                fontSize={18}
              />
            </Box>
          )}
        </Box>
      </Flex>
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
      notify('success', 'Xo?? b??nh lu???n th??nh c??ng');
      onClose();
      const res = await api.get(`api/posts/${post_id}`);
      if (res.data) {
        setDetail(res.data);
      }
    } else {
      notify('error', 'Xo?? b??nh lu???n th???t b???i');
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
            ????ng
          </Button>
          <Button onClick={handleDeleteComment} variant="ghost">
            Xo??
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
  const [showButtonPostComment, setShowButtonPostComment] = useState(false);

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const onSubmit = async (values: any) => {
    const response = await api.post(`api/posts/${id}/comment`, {
      comment: values.description
    });
    if (response.data) {
      notify('success', 'Th??m b??nh lu???n th??nh c??ng!');
      reset();
      const res = await api.get(`api/posts/${id}`);
      if (res.data) {
        setDetail(res.data);
      }
    } else {
      notify('error', 'Th??m b??nh lu???n th???t b???i!');
    }
  };

  return (
    <>
      <Text size="30" my={5}>
        {comments.length} B??nh lu???n
      </Text>
      <form id="respond" onSubmit={handleSubmit(onSubmit)}>
        <HStack spacing={4} my={5}>
          {session ? (
            <Avatar
              name={session.user.name}
              color={colorAvatar}
              bgColor={bgColorAvatar}
              size={'md'}
              src="https://bit.ly/broken-link"
            />
          ) : (
            <Avatar bgColor={bgColorAvatar} />
          )}
          <FormControl isInvalid={errors.description}>
            <Input
              variant={'flushed'}
              placeholder="????? l???i b??nh lu???n cho b??i vi???t n??y..."
              onClick={() => {
                if (session) {
                  setShowButtonPostComment(true);
                } else {
                  onOpen();
                }
              }}
              {...register('description', {
                required: 'B???n c???n th??m b??nh lu???n!'
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        {showButtonPostComment ? (
          <Flex justify={'flex-end'} align={'center'} my={4}>
            <Button
              width={{ base: 'full', md: '50%', lg: '30%' }}
              alignSelf={'flex-end'}
              borderRadius="0"
              variant={'solid'}
              color={colorAvatar}
              bgColor={bgColorAvatar}
              onClick={() => {
                setShowButtonPostComment(false);
                reset();
              }}
              mr={2}
            >
              Hu???
            </Button>
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
                G???i
              </Button>
            ) : undefined}
          </Flex>
        ) : undefined}
      </form>
      <ModalLoginRequest
        onClose={onClose}
        isOpen={isOpen}
        title="Y??u c???u ????ng nh???p"
        body={'B???n c???n ????ng nh???p ????? th???c hi???n b??nh lu???n'}
      />

      <List spacing={3} mt={3}>
        {reverseArr(comments).map((item, index) => (
          <CommentComponent key={index} {...item} setDetail={setDetail} />
        ))}
      </List>
    </>
  );
};

export default Respond;
