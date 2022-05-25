import { Grid, GridItem, Heading, Spinner, Text } from '@chakra-ui/react';
import {
  BreadcrumbElement,
  ListVPost,
  Loading,
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
  const [page, setPage] = useState(1);
  const { posts, isLoading, isError } = usePostsByTitle(key, page);
  const breadcrumb: IBreadcrumb[] = [];

  if (isLoading)
    return (
      <>
        <Loading />
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
      name: 'Trang chủ',
      href: '/'
    });
    breadcrumb.push({
      name: 'Tìm kiếm'
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
            <Heading my={2}>Kết quả tìm kiếm cho &quot;{key}&quot;</Heading>
            {posts.data.map((post, i) => (
              <Section key={i} delay={(i + 1) * 0.1 + 0.1} x={(i + 1) * -100}>
                <PostItem post={post} />
              </Section>
            ))}
            {posts.data.length ? (
              <Pagination
                links={posts.links}
                meta={posts.meta}
                setPage={setPage}
              />
            ) : (
              <Text fontWeight={'semibold'} fontSize={30}>
                Không có bài viết nào!
              </Text>
            )}
          </PostContainer>
        </GridItem>
        <GridItem
          display={'block'}
          colSpan={{ base: 3, md: 1 }}
          position="sticky"
          top={180}
        >
          <ListVPost title="Tài liệu mới nhất" slug="" />
        </GridItem>
      </Grid>
    </>
  );
};

export default SearchPage;
