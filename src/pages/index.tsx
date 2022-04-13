import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import ListVPost from 'components/post/ListVPost';
import { useSession } from 'next-auth/react';

import {
  PostItem,
  VPostItem,
  Pagination,
  PostContainer,
  Section
} from '../components';

const listPostItem = [1, 2, 3, 4, 5];

export default function HomePage() {
  // const { data: session, status } = useSession();
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <PostContainer>
          <Section delay={0.1}>
            <Heading as="h2" fontSize={'30'}>
              Tài liệu tổng hợp
            </Heading>
          </Section>
          {listPostItem.map((post, i) => (
            <Section key={i} delay={(i + 1) * 0.1 + 0.1} x={(i + 1) * -100}>
              <PostItem id={post} />
            </Section>
          ))}
          <Pagination />
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
  );
}
