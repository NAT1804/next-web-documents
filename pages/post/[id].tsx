import React from 'react';
import { Grid, GridItem, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { VPostItem, PostDetail } from '../../components';

const PostDetailPage = () => {
  const param = useRouter();
  const { id } = param.query;
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <PostDetail id={id}/>
      </GridItem>
      <GridItem colSpan={{ base: 3, md: 1 }}>
        <Heading as="h1">Tài liệu mới nhất</Heading>
        <VPostItem id={1} />
        <VPostItem id={2} />
        <VPostItem id={3} />
        <VPostItem id={4} />
      </GridItem>
    </Grid>
  );
};

export default PostDetailPage;
