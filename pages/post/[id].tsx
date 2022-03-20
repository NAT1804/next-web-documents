import React from 'react';
import { Grid, GridItem, Heading } from '@chakra-ui/react';

import { VPostItem } from '../../components';

const PostDetail = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <Heading as="h1">Detail Post</Heading>
        {/* <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <Pagination /> */}
      </GridItem>
      <GridItem colSpan={{ base: 3, md: 1 }}>
        <Heading as="h1">Tài liệu mới nhất</Heading>
        <VPostItem id={1} />
        <VPostItem id={2} />
      </GridItem>
    </Grid>
  );
};

export default PostDetail;
