import { Box, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import {
  PostItem,
  Pagination,
  PostContainer,
  Section,
  ListVPost
} from '../components';
import { usePosts } from '../hooks';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { posts, isLoading, isError } = usePosts(page);

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

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <PostContainer>
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
}
