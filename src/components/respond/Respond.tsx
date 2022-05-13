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
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Moment from 'react-moment';

import { ModalLoginRequest } from 'components/post/PostItem';
import api from 'api';
import ToastMessage from 'components/toast/Toast';
import { MdCheckCircle } from 'react-icons/md';
import { useUserById } from 'hooks';

const CommentComponent = ({
  id,
  comment,
  reply,
  created_at,
  likes,
  post_id,
  user_id
}) => {
  const hasChildren = reply && reply.length;
  const bgColorAvatar = useColorModeValue('primaryGreen', 'primaryOrange');
  const colorAvatar = useColorModeValue('white', 'black');
  const { user, isLoading, isError } = useUserById(user_id);

  if (isLoading) {
    console.log('Is Loading');
  }

  if (isError) {
    console.log('Has Error');
  }

  return (
    <ListItem key={id}>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Avatar
            name={user?.data?.name}
            color={colorAvatar}
            bgColor={bgColorAvatar}
            size={'sm'}
            src="https://bit.ly/broken-link"
            mr={2}
          />
          <Box fontWeight={'semibold'}>{user?.data?.name}</Box>
        </Flex>
        <Moment fromNow>{created_at}</Moment>
      </Flex>
      <Box ml={10} my={2}>
        {comment}
      </Box>
      {hasChildren ? (
        <List spacing={3} ml={5}>
          {reply.map(item => (
            <CommentComponent key={item.comment} {...item} />
          ))}
        </List>
      ) : undefined}
    </ListItem>
  );
};

const Respond = ({ id, comments, setComments }) => {
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
      setComments(comments);
      notify('success', 'Thêm bình luận thành công!');
      reset();
    } else {
      notify('error', 'Thêm bình luận thất bại!');
    }
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
        {comments.map((item, index) => (
          <CommentComponent key={index} {...item} />
        ))}
      </List>
    </>
  );
};

export default Respond;
