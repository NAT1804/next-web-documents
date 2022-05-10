import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
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

import { ModalLoginRequest } from 'components/post/PostItem';
import api from 'api';
import ToastMessage from 'components/toast/Toast';
import { MdCheckCircle } from 'react-icons/md';

const Respond = ({ id, comment }) => {
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

      {/* Comment */}
      <Text size="30" borderBottom={'solid 1px black'}>
        {comment.length} COMMENTS
      </Text>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
          <List spacing={3} ml={5}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Assumenda, quia temporibus eveniet a libero incidunt suscipit
              <List spacing={3} ml={5}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Assumenda, quia temporibus eveniet a libero incidunt suscipit
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
      </List>
    </>
  );
};

export default Respond;
