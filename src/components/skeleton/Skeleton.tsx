import {
  Box,
  Heading,
  Image,
  Link,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { PostInteractive, PostTags } from 'components/post/PostItem';
import { now } from 'moment';
import React from 'react';

const Skeleton = () => {
  const bgColorReverse = useColorModeValue('primaryOrange', 'primaryGreen');
  return (
    <>
      <Skeleton></Skeleton>
      <Box
        w="100%"
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
        marginBottom={4}
        paddingBottom={4}
        borderBottom={'1px solid #cccccc'}
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
            <PostTags tags={[]} />
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {/* <Skeleton isLoaded={false}> */}
              <Image
                borderRadius="lg"
                transform="scale(1.0)"
                // src="/logo-tailieu-vnu.png"
                src="/logo-3.png"
                alt="logo tailieu vnu"
                objectFit="contain"
                transition="0.3s ease-in-out"
                _hover={{
                  transform: 'scale(1.1)'
                }}
              />
              {/* </Skeleton> */}
            </Link>
          </Box>

          <Box
            width={{ base: '90%' }}
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
          {/* <Skeleton> */}
          <Heading
            fontSize={'2xl'}
            marginTop="1"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              lineClamp: 3,
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}
          >
            <Link
              textDecoration="none"
              _hover={{ textDecoration: 'none', color: bgColorReverse }}
            >
              Skeleton
            </Link>
          </Heading>
          {/* </Skeleton> */}
          <PostInteractive
            date={new Date(now())}
            quantity={1}
            id={1}
            likes={[]}
            reports={[]}
          />
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
          >
            Skeleton
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Skeleton;
