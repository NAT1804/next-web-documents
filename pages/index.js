import { Box, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import PreviewPdf from '../components/preview-pdf/preview-pdf';
import styles from '../styles/Home.module.css';
import { PostItem, VPostItem } from '../components/post/post-item';
import Pagination from '../components/pagination/Pagination';

export default function Home() {
  return (
    <>
      {/* <PreviewPdf height={600} path="/pdf/Document.pdf" /> */}
      {/* <Box h="100vh"></Box> */}
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <Heading as="h1">Tài liệu tổng hợp</Heading>
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <Pagination />
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 1 }}>
          <Heading as="h1">Tài liệu mới nhất</Heading>
          <VPostItem />
          <VPostItem />
        </GridItem>
      </Grid>
    </>
  );
}
