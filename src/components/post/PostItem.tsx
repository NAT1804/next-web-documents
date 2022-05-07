import React from 'react';
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

import api from 'api';
import { signIn, useSession } from 'next-auth/react';
import { MdReport, MdReportGmailerrorred } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { CustomUser } from 'types';

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
  quantity: Number;
}

export const PostComment: React.FC<IPostCommentProps> = props => {
  return (
    <HStack
      marginTop="2"
      spacing="2"
      display="flex"
      alignItems="center"
      cursor={'pointer'}
    >
      <ChatIcon />
      <Text>{props.quantity}</Text>
    </HStack>
  );
};

export const PostHeart = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const handleLikePost = async () => {
    const response = await api.post(`api/posts/${props.id}/like`);

    if (response.data) {
      console.log(response.data);
    } else {
      console.log('false');
    }
  };

  return (
    <HStack
      marginTop="2"
      spacing="2"
      display="flex"
      alignItems="center"
      cursor={'pointer'}
    >
      {session ? (
        props.likes.map(like => like.name).includes(session.user.name) ? (
          <AiFillHeart size={18} color="red" onClick={handleLikePost} />
        ) : (
          <AiOutlineHeart size={18} onClick={handleLikePost} />
        )
      ) : (
        <>
          <AiOutlineHeart size={18} onClick={onOpen} />
          <ModalLoginRequest
            onClose={onClose}
            isOpen={isOpen}
            title="Yêu cầu đăng nhập"
            body="Bạn cần đăng nhập để có thể thả tim bài viết này!"
          />
        </>
      )}
      <Text>{props.likes.length}</Text>
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
      {/* <ModalOverlay /> */}
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

export const ModalReport = ({ id, onClose, isOpen, title }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const handleReportPost = async (values: any) => {
    const response = await api.post(`api/posts/${id}/report`, {
      description: values.description
    });

    if (response.data) {
      onClose();
    } else {
      console.log('Error');
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

  return (
    <HStack
      marginTop="2"
      spacing="2"
      display="flex"
      alignItems="center"
      cursor={'pointer'}
    >
      {session ? (
        props.reports.map(report => report.user_id).includes(customUser.id) ? (
          <>
            <MdReport size={18} color="red" onClick={onOpen} />
            <ModalReport
              onClose={onClose}
              isOpen={isOpen}
              id={`${props.id}`}
              title="Báo cáo bài viết"
            />
          </>
        ) : (
          <>
            <MdReportGmailerrorred size={18} onClick={onOpen} />
            <ModalReport
              onClose={onClose}
              isOpen={isOpen}
              id={`${props.id}`}
              title="Báo cáo bài viết"
            />
          </>
        )
      ) : (
        <>
          <MdReportGmailerrorred
            size={18}
            onClick={() => {
              onOpen();
            }}
          />
          <ModalLoginRequest
            onClose={onClose}
            isOpen={isOpen}
            title="Yêu cầu đăng nhập"
            body="Bạn cần đăng nhập để có thể báo cáo bài viết này!"
          />
        </>
      )}

      <Text>{props.reports.length}</Text>
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
      <PostComment quantity={props.quantity} />
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
        <NextLink href={`/posts/${post.id}`} passHref>
          <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <Image
              transform="scale(1.0)"
              src="/logo-tailieu-vnu.png"
              alt="some text"
              objectFit="contain"
              width="100%"
              transition="0.3s ease-in-out"
              _hover={{
                transform: 'scale(1.05)'
              }}
            />
          </Link>
        </NextLink>
        <Heading fontSize="xl" marginTop="2">
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
        <Box display="flex" flex="1" position="relative" alignItems="center">
          <Box
            zIndex={1}
            width={{ base: '100%', sm: '85%' }}
            height={{ base: '100%', sm: '85%' }}
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

          <Box w="100%" position="absolute" height="100%">
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
