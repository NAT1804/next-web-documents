import { Flex, Link, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import api from 'api';
import { Loading } from 'components';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { HiOutlineChevronDoubleRight } from 'react-icons/hi';
import NextLink from 'next/link';

const FlexMotion = motion(Flex);

const Latest = () => {
  const [page, setPage] = useState(1);
  // const { posts, isLoading, isError } = usePosts(page);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [randomNumber, setRandomNumber] = useState(0);

  const getRandomInt = max => {
    return Math.floor(Math.random() * max);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`api/posts?page=${page}`);

        if (response.data) {
          setIsLoading(false);
          setPosts(response.data.data);
          setRandomNumber(getRandomInt(response.data.data.length));
        }
      } catch (error) {
        setIsError(true);
      }
    };

    fetchData();
  }, [page]);

  if (isLoading)
    return (
      <>
        <Skeleton height={42} />
      </>
    );

  if (isError) {
    return (
      <>
        <div>Failed to load</div>
      </>
    );
  }

  const changeToLocalTime = time => {
    const date = new Date(time);

    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <Flex align={'center'} height={'100%'}>
      <Flex align={'center'} flexShrink={0}>
        <Text mr={2} fontWeight="bold">
          Mới nhất
        </Text>
        <HiOutlineChevronDoubleRight fontWeight={'bold'} />
      </Flex>
      {posts.length ? (
        <>
          <NextLink href={`/posts/${posts[randomNumber].id}`} passHref>
            <Link boxShadow={'none'} _focusVisible={{ border: 'none' }}>
              <FlexMotion
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: -20 }
                }}
              >
                <Text mx={2}>
                  [{changeToLocalTime(posts[randomNumber].created_at)}]
                </Text>
                <Tooltip label={posts[randomNumber].title}>
                  <Text
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      lineClamp: 1,
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {posts[randomNumber].title}
                  </Text>
                </Tooltip>
              </FlexMotion>
            </Link>
          </NextLink>
        </>
      ) : undefined}
    </Flex>
  );
};

export default Latest;
