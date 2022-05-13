import React, { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { CalendarIcon, ChatIcon, InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SpaceProps,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { signIn, useSession } from 'next-auth/react';
import { MdReport, MdReportGmailerrorred } from 'react-icons/md';
import { useForm } from 'react-hook-form';

import ToastMessage from '../toast/Toast';
import api from 'api';
import { CustomUser, MESSAGE_FAIL, MESSAGE_SUCCESS } from 'types';
import { useRouter } from 'next/router';

interface IPostTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}

const PostTags: React.FC<IPostTags> = props => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map(tag => {
        return (
          <Tag p={2} size={'md'} variant="solid" colorScheme="red" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface IPostDateProps {
  date: Date;
}

export const PostDate: React.FC<IPostDateProps> = props => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <CalendarIcon />
      <Text>{props.date.toDateString()}</Text>
    </HStack>
  );
};

interface IPostCommentProps {
  id: Number;
  quantity: Number;
}

export const PostComment: React.FC<IPostCommentProps> = props => {
  const router = useRouter();
  return (
    <HStack
      marginTop="2"
      spacing="2"
      display="flex"
      alignItems="center"
      cursor={'pointer'}
      onClick={() => router.push(`/posts/${props.id}#respond`)}
    >
      <ChatIcon />
      <Text>{props.quantity}</Text>
    </HStack>
  );
};

export const PostHeart = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const [iconLike, setIconLike] = useState<string>(() => {
    if (session) {
      return props.likes.map(like => like.name).includes(session.user.name)
        ? 'Like'
        : 'Unlike';
    } else {
      return 'Unlike';
    }
  });
  const [likeCount, setlikeCount] = useState(props.likes.length);

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const handleLikePost = async () => {
    if (session) {
      const response = await api.post(`api/posts/${props.id}/like`);

      if (response.data) {
        setIconLike(response.data.message);
        if (response.data.message === 'Like') {
          setlikeCount(prev => prev + 1);
          notify('success', 'Like post successfully!');
        } else {
          setlikeCount(prev => prev - 1);
          notify('success', 'Unlike post successfully!');
        }
      } else {
        notify('error', 'Like post failed!');
      }
    } else {
      onOpen();
    }
  };

  return (
    <HStack
      marginTop="2"
      spacing="2"
      display="flex"
      alignItems="center"
      cursor={'pointer'}
      onClick={handleLikePost}
    >
      {iconLike === 'Like' ? (
        <AiFillHeart size={18} color="red" />
      ) : (
        <AiOutlineHeart size={18} />
      )}
      <Text>{likeCount}</Text>
      <ModalLoginRequest
        onClose={onClose}
        isOpen={isOpen}
        title="Yêu cầu đăng nhập"
        body="Bạn cần đăng nhập để có thể thả tim bài viết này!"
      />
    </HStack>
  );
};

export const ModalLoginRequest = ({ onClose, isOpen, title, body }) => {
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
          <NextLink href="/login" passHref>
            <Button
              onClick={e => {
                e.preventDefault();
                signIn();
              }}
              variant="ghost"
            >
              Sign In
            </Button>
          </NextLink>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const ModalReport = ({
  id,
  onClose,
  isOpen,
  title,
  setIconReport,
  setReportCount
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const handleReportPost = async (values: any) => {
    const response = await api.post(`api/posts/${id}/report`, {
      description: values.description
    });

    if (response.data) {
      setIconReport(MESSAGE_SUCCESS);
      setReportCount(prev => prev + 1);
      notify('success', 'Báo cáo bài viết thành công');
      onClose();
    } else {
      setIconReport(MESSAGE_FAIL);
      notify('error', 'Báo cáo bài viết thất bại');
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
        bg="none"
        backdropFilter="auto"
        backdropInvert="80%"
        backdropBlur="2px"
      />
      <form onSubmit={handleSubmit(handleReportPost)}>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={errors.description}>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'}>
                  <InfoIcon
                    color={useColorModeValue('primaryGreen', 'primaryOrange')}
                  />
                </InputLeftElement>
                <Input
                  type={'text'}
                  placeholder="Description"
                  {...register('description', {
                    required: 'This is required',
                    maxLength: {
                      value: 1000,
                      message:
                        'Description must not be greater than 1000 characters'
                    }
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              variant="ghost"
              isLoading={isSubmitting}
              color={useColorModeValue('white', 'black')}
              bgColor={useColorModeValue('primaryGreen', 'primaryOrange')}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export const PostReport = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const customUser = session?.user as CustomUser;

  const [iconReport, setIconReport] = useState<string>(() => {
    if (session) {
      return props.reports.map(report => report.user_id).includes(customUser.id)
        ? MESSAGE_SUCCESS
        : MESSAGE_FAIL;
    } else {
      return MESSAGE_FAIL;
    }
  });
  const [reportCount, setReportCount] = useState(props.reports.length);

  return (
    <HStack
      marginTop="2"
      spacing="2"
      display="flex"
      alignItems="center"
      cursor={'pointer'}
    >
      {iconReport === MESSAGE_SUCCESS ? (
        <MdReport size={18} color="red" onClick={onOpen} />
      ) : (
        <MdReportGmailerrorred size={18} onClick={onOpen} />
      )}

      <Text>{reportCount}</Text>
      {session ? (
        <ModalReport
          onClose={onClose}
          isOpen={isOpen}
          id={`${props.id}`}
          title="Báo cáo bài viết"
          setIconReport={setIconReport}
          setReportCount={setReportCount}
        />
      ) : (
        <ModalLoginRequest
          onClose={onClose}
          isOpen={isOpen}
          title="Yêu cầu đăng nhập"
          body="Bạn cần đăng nhập để có thể báo cáo bài viết này!"
        />
      )}
    </HStack>
  );
};

export const PostInteractive = props => {
  return (
    <Flex w="100%" my={3} flexWrap="wrap">
      <Box flexBasis={{ base: '100%', md: 'auto' }}>{props.children}</Box>
      &nbsp;&nbsp;
      <PostDate date={props.date} />
      &nbsp;&nbsp;
      <PostComment id={props.id} quantity={props.quantity} />
      &nbsp;&nbsp;
      <PostHeart id={props.id} likes={props.likes} />
      &nbsp;&nbsp;
      <PostReport id={props.id} reports={props.reports} />
    </Flex>
  );
};

export const VPostItem = ({ post }) => {
  return (
    <Box w="100%" my={'4'}>
      <Flex
        flexDir={'row'}
        justify={'center'}
        align={'center'}
        borderRadius="lg"
        overflow="hidden"
      >
        <Box display={{ base: 'none', sm: 'flex' }} w={{ base: '40%' }}>
          <NextLink href={`/posts/${post.id}`} passHref>
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                transform="scale(1.0)"
                src="/logo-tailieu-vnu.png"
                alt="logo"
                objectFit="contain"
                width="100%"
                transition="0.3s ease-in-out"
                _hover={{
                  transform: 'scale(1.05)'
                }}
              />
            </Link>
          </NextLink>
        </Box>
        <Heading
          flex={1}
          fontSize="xl"
          marginTop="2"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            lineClamp: 2,
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          <NextLink href={`/posts/${post.id}`} passHref>
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {post.title}
            </Link>
          </NextLink>
        </Heading>
      </Flex>
      <PostInteractive
        date={new Date(post.created_at)}
        quantity={post.comment.length}
        id={post.id}
        likes={post.likes}
        reports={post.reports}
      />
    </Box>
  );
};

export const PostItem = ({ post }) => {
  return (
    <>
      <Box
        w="100%"
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
        marginBottom={4}
      >
        <Box
          display="flex"
          // flex="1"
          position="relative"
          alignItems="center"
          justifyContent={'flex-start'}
        >
          <Box
            zIndex={1}
            width={{ base: '100%', sm: '70%' }}
            height={{ base: '100%', sm: '70%' }}
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%"
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <PostTags tags={[`${post.post_type_id}`]} />
            <NextLink href={`/posts/${post.id}`} passHref>
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  borderRadius="lg"
                  transform="scale(1.0)"
                  src="/logo-tailieu-vnu.png"
                  alt="logo tailieu vnu"
                  objectFit="contain"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: 'scale(1.05)'
                  }}
                />
              </Link>
            </NextLink>
          </Box>

          <Box
            width={{ base: '100%' }}
            height={{ base: '100%' }}
            position="absolute"
          >
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)'
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}
        >
          <Heading fontSize={'2xl'} marginTop="1">
            <NextLink href={`/posts/${post.id}`} passHref>
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                {post.title}
              </Link>
            </NextLink>
          </Heading>
          <PostInteractive
            date={new Date(post.created_at)}
            quantity={post.comment.length}
            id={post.id}
            likes={post.likes}
            reports={post.reports}
          />
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
          >
            {post.description}
          </Text>
        </Box>
      </Box>
    </>
  );
};