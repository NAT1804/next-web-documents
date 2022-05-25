import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Text
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import PreviewPdf from '../preview-pdf/PreviewPdf';
import { PostInteractive } from './PostItem';
import Respond from '../respond/Respond';
import api from 'api';
import { Loading } from '../../components';

export const PostType = props => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <PlusSquareIcon />
      <Text>{props.type}</Text>
    </HStack>
  );
};

const PostDetail = ({ detail, setDetail }) => {
  const { data } = detail;
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [nextPost, setNextPost] = useState<any>();
  const [prevPost, setPrevPost] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prevResponse = await api.get(`api/posts/${data.id - 1}`);
        const nextResponse = await api.get(`api/posts/${data.id + 1}`);
        setLoading(false);
        if (prevResponse.data) {
          setPrevPost(prevResponse.data.data);
        } else {
          setPrevPost(null);
        }
        if (nextResponse.data) {
          setNextPost(nextResponse.data.data);
        } else {
          setNextPost(null);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [data.id]);

  return (
    <Box w="100%">
      <Heading as="h1" fontSize={'30'} my={2}>
        {data.title}
      </Heading>
      <PostInteractive
        date={new Date(data.created_at)}
        quantity={data.comment.length}
        id={data.id}
        likes={data.likes}
        reports={data.reports}
      >
        <PostType type={data.post_type_id} />
      </PostInteractive>
      {data.link_pdf && <PreviewPdf file={data.link_pdf} />}
      <Box mt={4} dangerouslySetInnerHTML={{ __html: data.content }}></Box>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(5, 1fr)" gap={4} my={5} p={5}>
          <GridItem colSpan={{ base: 5, md: 2 }}>
            {nextPost ? (
              <>
                <NextLink href={`/posts/${data.id - 1}`} passHref>
                  <Link>
                    <Text fontWeight={'bold'}>{'<<'} Bài trước</Text>
                    {nextPost?.title}
                  </Link>
                </NextLink>
              </>
            ) : undefined}
            <Box></Box>
          </GridItem>
          <GridItem colStart={{ base: 1, md: 4 }} colEnd={6}>
            {prevPost ? (
              <>
                <NextLink href={`/posts/${data.id + 1}`} passHref>
                  <Link>
                    <Text textAlign={'right'} fontWeight={'bold'}>
                      Bài sau {'>>'}
                    </Text>
                    {prevPost && prevPost?.title}
                  </Link>
                </NextLink>
              </>
            ) : undefined}
          </GridItem>
        </Grid>
      )}
      <Respond id={data.id} comments={data.comment} setDetail={setDetail} />
    </Box>
  );
};

export default PostDetail;
