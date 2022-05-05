import React, { useEffect } from 'react';
import { Box, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { PostDetail, BreadcrumbElement } from '../../components';
import ListVPost from 'components/post/ListVPost';
import { usePostById } from 'hooks';
import { IBreadcrumb } from 'types';

const PostDetailPage = () => {
  const param = useRouter();
  const { id } = param.query;
  const breadcrumb: IBreadcrumb[] = [];

  const { post, isLoading, isError } = usePostById(id);

  if (isError) return <div>Failed to load</div>;
  if (isLoading)
    return (
      <>
        <Spinner size={'xl'} />
      </>
    );

  if (!isError && !isLoading) {
    breadcrumb.push({
      name: 'Home',
      href: `/`
    });
    breadcrumb.push({
      name: post.data.post_type_id,
      href: `/posts/type/${post.data.type_slug}`
    });
    breadcrumb.push({
      name: post.data.title
    });
  }

  return (
    <>
      <BreadcrumbElement breadcrumb={breadcrumb} />

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <PostDetail detail={post} />
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 1 }}>
          <ListVPost />
        </GridItem>
      </Grid>
    </>
  );
};

export default PostDetailPage;
