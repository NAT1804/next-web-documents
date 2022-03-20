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
      {/* <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text> */}
      <CalendarIcon />
      {/* <Text>—</Text> */}
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

interface IPostCommentProps {
  quantity: Number;
}

export const PostComment: React.FC<IPostCommentProps> = props => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      {/* <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text> */}
      <ChatIcon />
      {/* <Text>—</Text> */}
      <Text>{props.quantity}</Text>
    </HStack>
  );
};

export const VPostItem = ({ id }) => {
  return (
    <Wrap spacing="30px" marginTop="5">
      <WrapItem w="100%">
        <Box w="100%">
          <Box borderRadius="lg" overflow="hidden">
            <NextLink href={`/post/${id}`} passHref>
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
          </Box>
          <Heading fontSize="xl" marginTop="2">
            <NextLink href={`/post/${id}`} passHref>
              <Link
                // color={useColorModeValue('primaryGreen', 'primaryOrange')}
                textDecoration="none"
                _hover={{ textDecoration: 'none' }}
              >
                Sách và hành động tuyển GEN 16 - HYPE UP: NEW LEVEL
              </Link>
            </NextLink>
          </Heading>
          <Flex w="100%">
            <PostDate date={new Date()} />
            &nbsp;&nbsp;
            <PostComment quantity={2} />
          </Flex>
        </Box>
      </WrapItem>
    </Wrap>
  );
};

export const PostItem = ({ id }) => {
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
            <PostTags tags={['Đại học Công Nghệ']} />
            <NextLink href={`/post/${id}`} passHref>
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
            <NextLink href={`/post/${id}`} passHref>
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                Đề thi Điện Quang, Vật lý đại cương 2 giữa kỳ 1 năm học
                2021-2022 - UET
              </Link>
            </NextLink>
          </Heading>
          <Flex w="100%">
            <PostDate date={new Date()} />
            &nbsp;&nbsp;
            <PostComment quantity={2} />
          </Flex>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </Text>
        </Box>
      </Box>
    </>
  );
};
