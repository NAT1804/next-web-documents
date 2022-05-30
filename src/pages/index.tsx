import { Grid, GridItem, Heading, Skeleton, Spinner } from '@chakra-ui/react';
import { useState } from 'react';

import {
  PostItem,
  Pagination,
  PostContainer,
  Section,
  ListVPost,
  Loading
} from '../components';
import { usePosts } from '../hooks';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { posts, isLoading, isError } = usePosts(page);

  if (isLoading)
    return (
      <>
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          <GridItem colSpan={{ base: 3, md: 2 }}>
            <Skeleton height={100} mb={2} />
            <Skeleton height={100} mb={2} />
            <Skeleton height={100} mb={2} />
            <Skeleton height={100} mb={2} />
            <Skeleton height={100} mb={2} />
            <Skeleton height={100} mb={2} />
          </GridItem>
          <GridItem
            display={'block'}
            colSpan={{ base: 3, md: 1 }}
            position="sticky"
            top={180}
          >
            <Loading />
          </GridItem>
        </Grid>
      </>
    );

  if (isError) {
    return (
      <>
        <div>Failed to load</div>
      </>
    );
  }

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          {/* <Skeleton isLoaded={!isLoading} height={isLoading ? 500 : 'auto'}> */}
          <PostContainer>
            {posts &&
              posts.data.map((post, i) => (
                <Section key={i} delay={(i + 1) * 0.1 + 0.1} x={(i + 1) * -100}>
                  <PostItem post={post} />
                </Section>
              ))}
            {posts && (
              <Pagination
                links={posts.links}
                meta={posts.meta}
                setPage={setPage}
              />
            )}
          </PostContainer>
          {/* </Skeleton> */}
        </GridItem>
        <GridItem
          display={'block'}
          colSpan={{ base: 3, md: 1 }}
          position="sticky"
          top={180}
        >
          <ListVPost title={'Tài liệu mới nhất'} slug="" />
        </GridItem>
      </Grid>
    </>
  );
}
