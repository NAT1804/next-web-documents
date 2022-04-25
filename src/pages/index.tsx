import { Box, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import {
  PostItem,
  VPostItem,
  Pagination,
  PostContainer,
  Section,
  BreadcrumbElement,
  ListVPost
} from '../components';
import api, { fetcher } from 'api';

function usePosts() {
  const { data, error } = useSWR(`api/posts`, fetcher);
  return {
    posts: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default function HomePage() {
  const { posts, isLoading, isError } = usePosts();

  if (isLoading)
    return (
      <>
        <Spinner size="xl" />
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
      <BreadcrumbElement />
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <PostContainer>
            <Section delay={0.1}>
              <Heading as="h2" fontSize={'30'}>
                Tài liệu tổng hợp
              </Heading>
            </Section>
            {posts.data.map((post, i) => (
              <Section key={i} delay={(i + 1) * 0.1 + 0.1} x={(i + 1) * -100}>
                <PostItem post={post} />
              </Section>
            ))}
            <Pagination links={posts.links} meta={posts.meta} />
          </PostContainer>
        </GridItem>
        <GridItem
          display={'block'}
          colSpan={{ base: 3, md: 1 }}
          position="sticky"
          top={180}
        >
          <ListVPost />
        </GridItem>
      </Grid>
    </>
  );
}
