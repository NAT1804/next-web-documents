import { Grid, GridItem, Heading } from '@chakra-ui/react';

import {
  PostItem,
  VPostItem,
  Pagination,
  PostContainer,
  Section
} from '../components';

export default function Home() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <PostContainer>
          <Section delay={0.1}>
            <Heading as="h1">Tài liệu tổng hợp</Heading>
            <PostItem id={1} />
            <PostItem id={2} />
            <PostItem id={3} />
            <PostItem id={4} />
            <Pagination />
          </Section>
        </PostContainer>
      </GridItem>
      <GridItem colSpan={{ base: 3, md: 1 }}>
        <Heading as="h1">Tài liệu mới nhất</Heading>
        <VPostItem id={1} />
        <VPostItem id={2} />
      </GridItem>
    </Grid>
  );
}
