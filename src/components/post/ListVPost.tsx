import {
  Heading,
  Skeleton,
  Spinner,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';

import Section from 'components/section/Section';
import { VPostItem } from './PostItem';
import { usePosts, usePostsByType } from 'hooks';
import Loading from 'components/loading/Loading';
import { reverseArr } from 'helper';

const ListVPost = ({ title, slug }) => {
  // const { posts, isLoading, isError } = usePosts(1);
  const { posts, isLoading, isError } = usePostsByType(slug, 1);

  if (isLoading)
    return (
      <>
        <Skeleton>
          <Heading as="h1" fontSize={'30'} my={3}>
            Skeleton Text
          </Heading>
        </Skeleton>
        <Skeleton height={100} mb={2} />
        <Skeleton height={100} mb={2} />
        <Skeleton height={100} mb={2} />
        <Skeleton height={100} mb={2} />
        <Skeleton height={100} mb={2} />
        <Skeleton height={100} mb={2} />
        <Skeleton height={100} mb={2} />
      </>
    );

  if (isError) {
    return (
      <>
        <div>Has Error</div>
      </>
    );
  }

  return (
    <>
      <Section delay={0.1}>
        <Heading as="h1" fontSize={'30'} my={3}>
          {title}
        </Heading>
      </Section>
      {reverseArr(posts.data).map((vpost, i) => (
        <Section key={i} delay={0.2} x={(i + 1) * 100}>
          <VPostItem post={vpost} />
        </Section>
      ))}
    </>
  );
};

export default ListVPost;
