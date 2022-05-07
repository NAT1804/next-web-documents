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
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { ModalLoginRequest } from 'components/post/PostItem';

const Respond = ({ comment }) => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (values: any) => {
    // const res = await signIn('credentials', {
    //   redirect: false,
    //   email: values.email,
    //   password: values.password,
    //   callbackUrl: `${callbackUrl}`
    // });
    // if (res?.error) {
    //   setError(res.error);
    // }
    // if (res.url) router.push(res.url);
    if (!session) {
      onOpen();
    } else {
      console.log('v', values);
    }
  };

  const bgColorAvatar = useColorModeValue('primaryGreen', 'primaryOrange');
  const colorAvatar = useColorModeValue('white', 'black');

  return (
    <>
      <Grid templateColumns={'repeat(5, 1fr)'} gap={6} py={5} my={5}>
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
              <Button
                type="submit"
                width={{ base: 'full', md: '50%', lg: '30%' }}
                alignSelf={'flex-end'}
                borderRadius="0"
                variant={'solid'}
                color={useColorModeValue('white', 'black')}
                bgColor={useColorModeValue('primaryGreen', 'primaryOrange')}
                isLoading={isSubmitting}
              >
                Send
              </Button>
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
    </>
  );
};

export default Respond;
