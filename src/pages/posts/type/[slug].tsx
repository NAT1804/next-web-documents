import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import {
  PostDetail,
  BreadcrumbElement,
  ListVPost,
  PostContainer,
  Section,
  Pagination,
  PostItem
} from '../../../components';
import { usePostsByType } from 'hooks';
import { IBreadcrumb } from 'types';

const PostDetailPageByType = () => {
  const param = useRouter();
  const { slug } = param.query;

  const breadcrumb: IBreadcrumb[] = [];
  const [page, setPage] = useState(1);
  const { posts, isLoading, isError } = usePostsByType(slug, page);

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
      name: `${slug}`,
      href: `/posts/type/${slug}`
    });
  }

  return (
    <>
      <BreadcrumbElement breadcrumb={breadcrumb} />
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <PostContainer>
            <Section delay={0.1}>
              <Heading as="h2" fontSize={'30'}>
                {slug}
              </Heading>
            </Section>
            {posts.data.map((post, i) => (
              <Section key={i} delay={(i + 1) * 0.1 + 0.1} x={(i + 1) * -100}>
                <PostItem post={post} />
              </Section>
            ))}
            <Pagination
              links={posts.links}
              meta={posts.meta}
              setPage={setPage}
            />
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
};

export default PostDetailPageByType;
