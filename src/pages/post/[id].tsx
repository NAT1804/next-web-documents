import React, { useEffect } from 'react';
import { Box, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { VPostItem, PostDetail } from '../../components';
import ListVPost from 'components/post/ListVPost';
import api, { fetcher } from 'api';

// const fetcher =

const PostDetailPage = () => {
  const param = useRouter();
  const { id } = param.query;

  const { data, error } = useSWR(`/api/posts/${id}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <>
        <Spinner size={'xl'} />
      </>
    );

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <PostDetail id={id} file="/pdf/Document.pdf" detail={data} />
      </GridItem>
      <GridItem colSpan={{ base: 3, md: 1 }}>
        <ListVPost />
      </GridItem>
    </Grid>
  );
};

export default PostDetailPage;
