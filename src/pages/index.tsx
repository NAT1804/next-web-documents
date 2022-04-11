import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
// import { getSession } from 'next-auth/react';

import {
  PostItem,
  VPostItem,
  Pagination,
  PostContainer,
  Section
} from '../components';

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
          <Section delay={0.2}>
            <PostItem id={1} />
          </Section>
          <Section delay={0.3}>
            <PostItem id={2} />
          </Section>
          <Section delay={0.4}>
            <PostItem id={3} />
          </Section>
          <Section delay={0.5}>
            <PostItem id={4} />
          </Section>
          <Pagination />
        </PostContainer>
      </GridItem>
      <GridItem
        display={'block'}
        colSpan={{ base: 3, md: 1 }}
        position="sticky"
        top={180}
      >
        <Heading as="h1" fontSize={'30'}>
          Tài liệu mới nhất
        </Heading>
        <VPostItem id={1} />
        <VPostItem id={2} />
        <VPostItem id={3} />
        <VPostItem id={4} />
      </GridItem>
    </Grid>
  );
}
