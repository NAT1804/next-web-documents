import { Grid, GridItem, Heading, Spinner } from '@chakra-ui/react';
import {
  BreadcrumbElement,
  ListVPost,
  Pagination,
  PostContainer,
  PostItem,
  Section
} from 'components';
import { usePostsByTitle } from 'hooks';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IBreadcrumb } from 'types';

const SearchPage = () => {
  const router = useRouter();
  const { key } = router.query;
  console.log('key', key);
  const [page, setPage] = useState(1);
  const { posts, isLoading, isError } = usePostsByTitle(key, page);
  const breadcrumb: IBreadcrumb[] = [];

  if (isLoading)
    return (
      <>
        <Spinner size="xl" />
      </>
    );

  if (isError) {
    return (
      <>
        <div>Failed to load</div>
      </>
    );
  }

  if (!isError && !isLoading) {
    breadcrumb.push({
      name: 'Home',
      href: '/'
    });
    breadcrumb.push({
      name: 'Search'
    });
    breadcrumb.push({
      name: key as string
    });
  }

  return (
    <>
      <BreadcrumbElement breadcrumb={breadcrumb} />
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <PostContainer>
            <Heading my={2}>Search Results for &quot;{key}&quot;</Heading>
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

export default SearchPage;
