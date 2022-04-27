import React from 'react';
import NextLink from 'next/link';
import { CalendarIcon, ChatIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  SpaceProps,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

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
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <ChatIcon />
      <Text>{props.quantity}</Text>
    </HStack>
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
      <Flex w="100%">
        <PostDate date={new Date(post.created_at)} />
        &nbsp;&nbsp;
        <PostComment quantity={post.comment.length} />
      </Flex>
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
                  src="logo-tailieu-vnu.png"
                  alt="some good alt text"
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
          <Flex w="100%">
            <PostDate date={new Date(post.created_at)} />
            &nbsp;&nbsp;
            <PostComment quantity={post.comment.length} />
          </Flex>
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
